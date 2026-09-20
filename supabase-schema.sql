-- HYDR8 Supabase schema. Run this in Supabase SQL Editor.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  age_range text,
  sport text,
  units text not null default 'F' check (units in ('F','C')),
  hydration_preferences jsonb not null default '{}'::jsonb,
  notification_preferences jsonb not null default '{"enabled":true}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  sport text not null,
  workout_type text not null,
  environment text,
  temperature numeric,
  duration_seconds integer not null check (duration_seconds >= 0),
  fluid_intake_ml numeric not null default 0 check (fluid_intake_ml >= 0),
  sweat_rate_lph numeric,
  hydration_score numeric check (hydration_score >= 0 and hydration_score <= 100),
  sensor_data jsonb not null default '{}'::jsonb,
  warnings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
drop policy if exists "profiles own rows" on public.profiles;
drop policy if exists "sessions own rows" on public.sessions;
create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "sessions own rows" on public.sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id, first_name) values (new.id, coalesce(new.raw_user_meta_data->>'first_name','')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
