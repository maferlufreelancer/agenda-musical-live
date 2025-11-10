-- Fix profiles table RLS policy to prevent public exposure of sensitive data
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a more restrictive policy that only allows users to view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow musicians to be viewed by anyone (for the search page)
-- but only expose non-sensitive data through the musicians table
-- The profiles table should remain private