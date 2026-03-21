-- FadeScore Supabase Schema
-- Run this in the Supabase SQL Editor or via scripts/setup-db.ts

-- ── Cities ─────────────────────────────────────────────────────────
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  state text not null,
  state_abbr text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz default now()
);

create index if not exists idx_cities_slug on cities(slug);

-- ── Shops ──────────────────────────────────────────────────────────
create table if not exists shops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  address text,
  phone text,
  instagram text,
  website text,
  booking_url text,
  claimed_by text,
  avg_price numeric default 0,
  fade_score numeric default 0,
  city_id uuid not null references cities(id) on delete cascade,
  created_at timestamptz default now()
);

create index if not exists idx_shops_slug on shops(slug);
create index if not exists idx_shops_city_id on shops(city_id);

-- ── Barbers ────────────────────────────────────────────────────────
create table if not exists barbers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  fade_score numeric default 0,
  review_count integer default 0,
  avg_price numeric default 0,
  specialties text[] default '{}',
  hair_types text[] default '{}',
  cut_types text[] default '{}',
  is_hidden_gem boolean default false,
  is_cheap boolean default false,
  shop_id uuid not null references shops(id) on delete cascade,
  created_at timestamptz default now()
);

create index if not exists idx_barbers_slug on barbers(slug);
create index if not exists idx_barbers_shop_id on barbers(shop_id);
create index if not exists idx_barbers_fade_score on barbers(fade_score desc);
create index if not exists idx_barbers_hidden_gem on barbers(is_hidden_gem) where is_hidden_gem = true;

-- ── Review Sources ─────────────────────────────────────────────────
create table if not exists review_sources (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  platform text not null,
  rating numeric default 0,
  review_count integer default 0,
  last_synced_at timestamptz,
  created_at timestamptz default now(),
  unique(shop_id, platform)
);

create index if not exists idx_review_sources_shop_id on review_sources(shop_id);

-- ── User Reviews ───────────────────────────────────────────────────
create table if not exists user_reviews (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references barbers(id) on delete cascade,
  email text not null,
  display_name text,
  rating numeric not null,
  comment text,
  email_verified boolean default false,
  verified_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_user_reviews_barber_id on user_reviews(barber_id);

-- ── Email Verifications ────────────────────────────────────────────
create table if not exists email_verifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- ── Claim Requests ─────────────────────────────────────────────────
create table if not exists claim_requests (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  email text not null,
  name text,
  role text,
  message text,
  created_at timestamptz default now()
);

-- ── City Waitlist ──────────────────────────────────────────────────
create table if not exists city_waitlist (
  id uuid primary key default gen_random_uuid(),
  city_name text not null,
  email text not null,
  created_at timestamptz default now(),
  unique(city_name, email)
);

-- ── Notification Subscriptions ─────────────────────────────────────
create table if not exists notification_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  city_slug text,
  barber_slug text,
  notify_new_barbers boolean default false,
  notify_price_drops boolean default false,
  created_at timestamptz default now()
);

-- ── Intake Submissions ─────────────────────────────────────────────
create table if not exists intake_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  barber_slug text,
  barber_name text,
  shop_name text,
  city text,
  state text,
  not_listed boolean default false,
  custom_name text,
  custom_shop_name text,
  custom_city text,
  custom_state text,
  hair_types text[] default '{}',
  cut_types text[] default '{}',
  notes text,
  created_at timestamptz default now()
);

-- ── Row Level Security ─────────────────────────────────────────────
-- Enable RLS on all tables (service_role key bypasses RLS)
alter table cities enable row level security;
alter table shops enable row level security;
alter table barbers enable row level security;
alter table review_sources enable row level security;
alter table user_reviews enable row level security;
alter table email_verifications enable row level security;
alter table claim_requests enable row level security;
alter table city_waitlist enable row level security;
alter table notification_subscriptions enable row level security;
alter table intake_submissions enable row level security;

-- Public read access for cities, shops, barbers, review_sources
create policy "Public read cities" on cities for select using (true);
create policy "Public read shops" on shops for select using (true);
create policy "Public read barbers" on barbers for select using (true);
create policy "Public read review_sources" on review_sources for select using (true);
create policy "Public read user_reviews" on user_reviews for select using (true);

-- Anon insert for user-facing forms
create policy "Anon insert user_reviews" on user_reviews for insert with check (true);
create policy "Anon insert email_verifications" on email_verifications for insert with check (true);
create policy "Anon select email_verifications" on email_verifications for select using (true);
create policy "Anon update email_verifications" on email_verifications for update using (true);
create policy "Anon insert claim_requests" on claim_requests for insert with check (true);
create policy "Anon insert city_waitlist" on city_waitlist for insert with check (true);
create policy "Anon insert notification_subscriptions" on notification_subscriptions for insert with check (true);
create policy "Anon insert intake_submissions" on intake_submissions for insert with check (true);
