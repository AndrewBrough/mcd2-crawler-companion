-- Catalog tables for locations, enemies, gear, and items.
-- Nested collections from the app schema (enemy_ids, gear_table, item_table,
-- related_locations, sources) are stored as junction tables so drop rates
-- stay numeric and foreign keys stay enforceable.
--
-- PKs are uuid. Hosted Supabase Postgres 17 does not ship uuidv7 / pg_uuidv7,
-- so gen_random_uuid() is the supported default.

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  thumbnail_url text
);

create table public.enemies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  thumbnail_url text
);

create table public.gear (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  thumbnail_url text
);

create table public.items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  thumbnail_url text
);

create table public.location_enemies (
  location_id uuid not null references public.locations (id) on delete cascade,
  enemy_id uuid not null references public.enemies (id) on delete cascade,
  primary key (location_id, enemy_id)
);

create index location_enemies_enemy_id_idx on public.location_enemies (enemy_id);

create table public.location_relations (
  location_id uuid not null references public.locations (id) on delete cascade,
  related_location_id uuid not null references public.locations (id) on delete cascade,
  primary key (location_id, related_location_id),
  constraint location_relations_no_self_ref check (location_id <> related_location_id)
);

create index location_relations_related_location_id_idx
  on public.location_relations (related_location_id);

create table public.location_gear_drops (
  location_id uuid not null references public.locations (id) on delete cascade,
  gear_id uuid not null references public.gear (id) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (location_id, gear_id),
  constraint location_gear_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index location_gear_drops_gear_id_idx on public.location_gear_drops (gear_id);

create table public.location_item_drops (
  location_id uuid not null references public.locations (id) on delete cascade,
  item_id uuid not null references public.items (id) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (location_id, item_id),
  constraint location_item_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index location_item_drops_item_id_idx on public.location_item_drops (item_id);

create table public.enemy_gear_drops (
  enemy_id uuid not null references public.enemies (id) on delete cascade,
  gear_id uuid not null references public.gear (id) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (enemy_id, gear_id),
  constraint enemy_gear_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index enemy_gear_drops_gear_id_idx on public.enemy_gear_drops (gear_id);

create table public.enemy_item_drops (
  enemy_id uuid not null references public.enemies (id) on delete cascade,
  item_id uuid not null references public.items (id) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (enemy_id, item_id),
  constraint enemy_item_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index enemy_item_drops_item_id_idx on public.enemy_item_drops (item_id);

comment on column public.location_gear_drops.drop_rate is
  'Drop probability as a fraction in [0, 1]. Example: 0.15 = 15%.';
comment on column public.location_item_drops.drop_rate is
  'Drop probability as a fraction in [0, 1]. Example: 0.15 = 15%.';
comment on column public.enemy_gear_drops.drop_rate is
  'Drop probability as a fraction in [0, 1]. Example: 0.15 = 15%.';
comment on column public.enemy_item_drops.drop_rate is
  'Drop probability as a fraction in [0, 1]. Example: 0.15 = 15%.';

grant select on table
  public.locations,
  public.enemies,
  public.gear,
  public.items,
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
to anon, authenticated;

grant select, insert, update, delete on table
  public.locations,
  public.enemies,
  public.gear,
  public.items,
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
to service_role;

do $$
declare
  catalog_table text;
begin
  foreach catalog_table in array array[
    'locations',
    'enemies',
    'gear',
    'items',
    'location_enemies',
    'location_relations',
    'location_gear_drops',
    'location_item_drops',
    'enemy_gear_drops',
    'enemy_item_drops'
  ]
  loop
    execute format(
      'alter table public.%I enable row level security',
      catalog_table
    );
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      catalog_table || '_select_public',
      catalog_table
    );
  end loop;
end $$;
