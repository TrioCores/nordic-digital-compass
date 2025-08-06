-- Update trigger function to include multiple owner emails
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
      when new.email in (
        'emilmh.nw@outlook.com',
        'Mikkelwb.nw@outlook.dk'  
      ) then 'owner'
      else 'user'
    end
  );
  return new;
end;
$$;
