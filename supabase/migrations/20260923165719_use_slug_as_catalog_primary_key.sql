drop table if exists public.location_enemies;
drop table if exists public.location_relations;
drop table if exists public.location_gear_drops;
drop table if exists public.location_item_drops;
drop table if exists public.enemy_gear_drops;
drop table if exists public.enemy_item_drops;

alter table public.locations drop constraint locations_pkey;
alter table public.locations drop column id;
alter table public.locations drop constraint locations_slug_key;
alter table public.locations add primary key (slug);

alter table public.enemies drop constraint enemies_pkey;
alter table public.enemies drop column id;
alter table public.enemies drop constraint enemies_slug_key;
alter table public.enemies add primary key (slug);

alter table public.gear drop constraint gear_pkey;
alter table public.gear drop column id;
alter table public.gear drop constraint gear_slug_key;
alter table public.gear add primary key (slug);

alter table public.items drop constraint items_pkey;
alter table public.items drop column id;
alter table public.items drop constraint items_slug_key;
alter table public.items add primary key (slug);

comment on column public.locations.slug is
  'Primary key and storage key. Thumbnail path: locations/{slug}.png in catalog-thumbnails. Immutable.';
comment on column public.enemies.slug is
  'Primary key and storage key. Thumbnail path: enemies/{slug}.png in catalog-thumbnails. Immutable.';
comment on column public.gear.slug is
  'Primary key and storage key. Thumbnail path: gear/{slug}.png in catalog-thumbnails. Immutable.';
comment on column public.items.slug is
  'Primary key and storage key. Thumbnail path: items/{slug}.png in catalog-thumbnails. Immutable.';

create table public.location_enemies (
  location_id text not null references public.locations (slug) on delete cascade,
  enemy_id text not null references public.enemies (slug) on delete cascade,
  primary key (location_id, enemy_id)
);

create index location_enemies_enemy_id_idx on public.location_enemies (enemy_id);

create table public.location_relations (
  location_id text not null references public.locations (slug) on delete cascade,
  related_location_id text not null references public.locations (slug) on delete cascade,
  primary key (location_id, related_location_id),
  constraint location_relations_no_self_ref check (location_id <> related_location_id)
);

create index location_relations_related_location_id_idx
  on public.location_relations (related_location_id);

create table public.location_gear_drops (
  location_id text not null references public.locations (slug) on delete cascade,
  gear_id text not null references public.gear (slug) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (location_id, gear_id),
  constraint location_gear_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index location_gear_drops_gear_id_idx on public.location_gear_drops (gear_id);

create table public.location_item_drops (
  location_id text not null references public.locations (slug) on delete cascade,
  item_id text not null references public.items (slug) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (location_id, item_id),
  constraint location_item_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index location_item_drops_item_id_idx on public.location_item_drops (item_id);

create table public.enemy_gear_drops (
  enemy_id text not null references public.enemies (slug) on delete cascade,
  gear_id text not null references public.gear (slug) on delete cascade,
  drop_rate numeric(7, 4) not null,
  primary key (enemy_id, gear_id),
  constraint enemy_gear_drops_drop_rate_check
    check (drop_rate >= 0 and drop_rate <= 1)
);

create index enemy_gear_drops_gear_id_idx on public.enemy_gear_drops (gear_id);

create table public.enemy_item_drops (
  enemy_id text not null references public.enemies (slug) on delete cascade,
  item_id text not null references public.items (slug) on delete cascade,
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
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
to anon, authenticated;

grant select, insert, update, delete on table
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
to service_role;

revoke insert, update, delete on table
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
from anon, authenticated;

do $$
declare
  catalog_table text;
begin
  foreach catalog_table in array array[
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
