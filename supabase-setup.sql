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

-- Add featured column to members table
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_members_is_featured ON public.members(is_featured);

-- Create the partners table with light and dark mode logos
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  logo_url_dark TEXT NOT NULL DEFAULT '',
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.partners
  FOR SELECT USING (true);
