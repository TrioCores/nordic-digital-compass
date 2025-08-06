-- Enable RLS (Row Level Security)
alter table if exists public.user_profiles enable row level security;

-- Create user_profiles table if it doesn't exist
create table if not exists public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('user', 'admin', 'owner')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create documents table
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  original_name text not null,
  file_path text not null,
  file_size bigint not null,
  file_type text not null,
  uploaded_by uuid references auth.users(id) on delete cascade not null,
  description text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on documents table
alter table public.documents enable row level security;

-- Create storage bucket for documents
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  52428800, -- 50MB limit
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
  ]
) on conflict (id) do nothing;

-- RLS Policies for user_profiles
create policy "Users can view own profile" on public.user_profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.user_profiles
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on public.user_profiles
  for select using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Owners can manage all profiles" on public.user_profiles
  for all using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'owner'
    )
  );

-- RLS Policies for documents
create policy "Admins can view all documents" on public.documents
  for select using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Admins can insert documents" on public.documents
  for insert with check (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Admins can update documents" on public.documents
  for update using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Admins can delete documents" on public.documents
  for delete using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

-- Storage policies for documents bucket
create policy "Admins can upload documents" on storage.objects
  for insert with check (
    bucket_id = 'documents' and
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Admins can view documents" on storage.objects
  for select using (
    bucket_id = 'documents' and
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

create policy "Admins can delete documents" on storage.objects
  for delete using (
    bucket_id = 'documents' and
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role in ('admin', 'owner')
    )
  );

-- Function to automatically create user profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    case 
      when new.email = 'emilmh.nw@outlook.com' then 'owner'
      else 'user'
    end
  );
  return new;
end;
$$;

-- Trigger to create profile on user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Triggers for updated_at
drop trigger if exists handle_updated_at on public.user_profiles;
create trigger handle_updated_at
  before update on public.user_profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_updated_at on public.documents;
create trigger handle_updated_at
  before update on public.documents
  for each row execute procedure public.handle_updated_at();
