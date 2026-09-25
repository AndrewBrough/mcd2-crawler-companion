-- Track when catalog rows were first stored. Existing rows are backfilled
-- with the migration time. Inserts that omit the column use the current time.

alter table public.gear
  add column created_at timestamptz not null default now();

alter table public.locations
  add column created_at timestamptz not null default now();

alter table public.enchantments
  add column created_at timestamptz not null default now();

alter table public.enemies
  add column created_at timestamptz not null default now();
