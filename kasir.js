-- SANDIKALE: profile user + role access
create table if not exists public.sandikale_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  username text not null unique,
  role text not null default 'Kasir' check (role in ('Admin','Kasir','Produksi')),
  status text not null default 'Aktif' check (status in ('Aktif','Nonaktif')),
  created_at timestamptz not null default now()
);

create index if not exists sandikale_users_username_idx on public.sandikale_users (lower(username));

alter table public.sandikale_users enable row level security;

drop policy if exists "users_read_own_profile" on public.sandikale_users;
create policy "users_read_own_profile"
on public.sandikale_users
for select
to authenticated
using ((select auth.uid()) = id);

revoke all on public.sandikale_users from anon;
revoke all on public.sandikale_users from authenticated;
grant select on public.sandikale_users to authenticated;

-- CRUD user dilakukan oleh Edge Function dengan service_role di sisi server.
-- Jangan pernah memasukkan service_role key ke HTML/JS.
