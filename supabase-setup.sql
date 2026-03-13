-- Create the members table
CREATE TABLE IF NOT EXISTS public.members (
  id TEXT PRIMARY KEY,
  photo_url TEXT NOT NULL,
  name TEXT NOT NULL,
  role_company TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  x_link TEXT NOT NULL,
  achievements JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.members
  FOR SELECT USING (true);
