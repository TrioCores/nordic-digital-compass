-- Midlertidigt deaktiver RLS for at teste admin funktionalitet
-- Dette kan køres i Supabase SQL Editor

-- Deaktiver RLS på user_profiles tabellen midlertidigt
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Bekræft at alle brugere kan læses
SELECT id, email, full_name, role, created_at FROM public.user_profiles ORDER BY created_at DESC;
