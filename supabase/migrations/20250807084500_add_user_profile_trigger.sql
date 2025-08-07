-- Add trigger to automatically create user profile when new user signs up

-- Create trigger for auth.users table to automatically create user profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add RLS policy for users to see their own profile
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own profile
CREATE POLICY "Users can view own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Allow the trigger function to insert new profiles (needed for SECURITY DEFINER function)
CREATE POLICY "Enable insert for authenticated users during signup" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
