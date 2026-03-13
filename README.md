# Superteam MY Website

A Next.js website for Superteam Malaysia - a community of builders, developers, and creators in the Solana ecosystem.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with Shadcn UI
- **Icons**: React Icons (Lucide)
- **Image Optimization**: Next.js Image

## Features

- Landing page with hero section, partners marquee, and member spotlight
- Members directory with search, filter, and grid/table view
- Admin panel for managing members, partners, and admin users
- Featured member selection
- Infinite marquee for partner logos (light/dark mode)
- Responsive design for mobile and desktop

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Installation

```bash
# Install dependencies
npm install

# or with yarn
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Local Development

```bash
# Start development server
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000).

## Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `supabase-setup.sql` in the Supabase SQL editor to create:
   - `members` table
   - `partners` table
   - `admins` table

### Initial Admin Setup

Run this SQL to create the first admin user:

```sql
INSERT INTO public.admins (id, username, email, password_hash)
VALUES (
  'admin',
  'admin',
  'admin@domain.com',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
);
```

The password hash is the SHA-256 hash of "admin".

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/            # Admin panel pages
│   ├── api/              # API routes
│   ├── members/          # Members directory
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   └── views/           # Feature-specific components
│       ├── landing/     # Landing page components
│       └── members/     # Members page components
├── lib/                  # Utilities and configs
│   ├── supabase/        # Supabase client
│   └── general/        # General utilities
└── public/              # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the environment variables in Vercel project settings
4. Deploy

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Admin Panel

Access the admin panel at `/admin/login`

- Default credentials after initial setup:
  - Username: admin
  - Email: admin@domain.com
  - Password: admin

## License

MIT
