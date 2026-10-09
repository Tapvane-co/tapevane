-- Tapvane database, Stage 4: customer profiles + profile photo storage.
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- It is safe to run more than once.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9-]{3,30}$'),
  full_name text not null check (char_length(full_name) between 1 and 60),
  title text check (char_length(title) <= 60),
  company text check (char_length(company) <= 60),
  bio text check (char_length(bio) <= 120),
  photo_url text,
  cover_url text,
  phone text,
  whatsapp text,
  email text,
  website text,
  location text,
  instagram text,
  linkedin text,
  x text,
  tiktok text,
  facebook text,
  snapchat text,
  theme text not null default 'noir',
  accent_color text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_owner_idx on public.profiles (owner_user_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Row-level security: the rules about who can see and change what.
alter table public.profiles enable row level security;

drop policy if exists "Anyone can view active profiles" on public.profiles;
create policy "Anyone can view active profiles"
  on public.profiles for select
  using (is_active or owner_user_id = auth.uid());

drop policy if exists "Owners can create their profile" on public.profiles;
create policy "Owners can create their profile"
  on public.profiles for insert
  to authenticated
  with check (owner_user_id = auth.uid());

drop policy if exists "Owners can update their profile" on public.profiles;
create policy "Owners can update their profile"
  on public.profiles for update
  to authenticated
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

drop policy if exists "Owners can delete their profile" on public.profiles;
create policy "Owners can delete their profile"
  on public.profiles for delete
  to authenticated
  using (owner_user_id = auth.uid());

-- Profile photos: public to view, but each person can only write inside their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-photos', 'profile-photos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "Anyone can view profile photos" on storage.objects;
create policy "Anyone can view profile photos"
  on storage.objects for select
  using (bucket_id = 'profile-photos');

drop policy if exists "Users upload their own photos" on storage.objects;
create policy "Users upload their own photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users update their own photos" on storage.objects;
create policy "Users update their own photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users delete their own photos" on storage.objects;
create policy "Users delete their own photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);
