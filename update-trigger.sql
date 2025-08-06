-- Update trigger function to automatically assign owner role to your email
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
