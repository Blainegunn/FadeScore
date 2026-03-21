-- FadeScore initial schema
-- Run against your Supabase project via the SQL editor or CLI

-- ── Enable extensions ──────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Cities ─────────────────────────────────────────────────────────
create table cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  state text not null,
  state_abbr text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz default now()
);

-- ── Shops ──────────────────────────────────────────────────────────
create table shops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city_id uuid not null references cities(id) on delete cascade,
  address text,
  phone text,
  instagram text,
  website text,
  avg_price int,
  fade_score numeric(3,1),
  claimed_by uuid,
  booking_url text,
  google_place_id text,
  created_at timestamptz default now()
);

create index idx_shops_city_id on shops(city_id);
create index idx_shops_slug on shops(slug);

-- ── Barbers ────────────────────────────────────────────────────────
create table barbers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  shop_id uuid not null references shops(id) on delete cascade,
  fade_score numeric(3,1),
  review_count int default 0,
  avg_price int,
  specialties text[] default '{}',
  hair_types text[] default '{}',
  cut_types text[] default '{}',
  is_hidden_gem bool default false,
  is_cheap bool default false,
  created_at timestamptz default now()
);

create index idx_barbers_shop_id on barbers(shop_id);
create index idx_barbers_slug on barbers(slug);
create index idx_barbers_hidden_gem on barbers(is_hidden_gem) where is_hidden_gem = true;

-- ── Review Sources (Google, Yelp, etc.) ────────────────────────────
create table review_sources (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  platform text not null,
  rating numeric(2,1),
  review_count int default 0,
  last_synced_at timestamptz default now()
);

create index idx_review_sources_shop_id on review_sources(shop_id);

-- ── User Reviews ───────────────────────────────────────────────────
create table user_reviews (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references barbers(id) on delete cascade,
  email text not null,
  email_verified bool default false,
  display_name text,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  verified_at timestamptz,
  created_at timestamptz default now()
);

create index idx_user_reviews_barber_id on user_reviews(barber_id);

-- ── Email Verifications ────────────────────────────────────────────
create table email_verifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code text not null,
  expires_at timestamptz not null,
  used bool default false,
  created_at timestamptz default now()
);

-- ── Intake Submissions ─────────────────────────────────────────────
create table intake_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  barber_slug text,
  barber_name text,
  shop_name text,
  city text,
  state text,
  not_listed bool default false,
  custom_name text,
  custom_shop_name text,
  custom_city text,
  custom_state text,
  hair_types text[] default '{}',
  cut_types text[] default '{}',
  notes text,
  submitted_at timestamptz default now()
);

-- ── Claim Requests ─────────────────────────────────────────────────
create table claim_requests (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null default 'owner',
  message text,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- ── City Waitlist ──────────────────────────────────────────────────
create table city_waitlist (
  id uuid primary key default gen_random_uuid(),
  city_name text not null,
  email text not null,
  created_at timestamptz default now(),
  unique(city_name, email)
);

-- ── Notification Subscriptions ─────────────────────────────────────
create table notification_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text,
  city_slug text,
  barber_slug text,
  notify_new_barbers bool default true,
  notify_price_drops bool default true,
  created_at timestamptz default now()
);

-- ── Row Level Security ─────────────────────────────────────────────

-- Public read, service-role write for core data
alter table cities enable row level security;
create policy "Public read cities" on cities for select using (true);
create policy "Service write cities" on cities for all using (auth.role() = 'service_role');

alter table shops enable row level security;
create policy "Public read shops" on shops for select using (true);
create policy "Service write shops" on shops for all using (auth.role() = 'service_role');

alter table barbers enable row level security;
create policy "Public read barbers" on barbers for select using (true);
create policy "Service write barbers" on barbers for all using (auth.role() = 'service_role');

alter table review_sources enable row level security;
create policy "Public read review_sources" on review_sources for select using (true);
create policy "Service write review_sources" on review_sources for all using (auth.role() = 'service_role');

-- User reviews: anyone can insert, only verified reviews visible
alter table user_reviews enable row level security;
create policy "Anyone can insert reviews" on user_reviews for insert with check (true);
create policy "Read verified reviews" on user_reviews for select using (email_verified = true);
create policy "Service manage reviews" on user_reviews for all using (auth.role() = 'service_role');

-- Email verifications: service role only
alter table email_verifications enable row level security;
create policy "Service manage verifications" on email_verifications for all using (auth.role() = 'service_role');

-- Intake submissions: anyone can insert, admin read
alter table intake_submissions enable row level security;
create policy "Anyone can submit intake" on intake_submissions for insert with check (true);
create policy "Service read intake" on intake_submissions for select using (auth.role() = 'service_role');

-- Claim requests: anyone can insert, admin read
alter table claim_requests enable row level security;
create policy "Anyone can submit claims" on claim_requests for insert with check (true);
create policy "Service read claims" on claim_requests for select using (auth.role() = 'service_role');

-- City waitlist: anyone can insert, admin read
alter table city_waitlist enable row level security;
create policy "Anyone can join waitlist" on city_waitlist for insert with check (true);
create policy "Service read waitlist" on city_waitlist for select using (auth.role() = 'service_role');

-- Notification subscriptions: anyone can insert, admin read
alter table notification_subscriptions enable row level security;
create policy "Anyone can subscribe" on notification_subscriptions for insert with check (true);
create policy "Service read subscriptions" on notification_subscriptions for select using (auth.role() = 'service_role');
