alter table public.locations add column if not exists slug text;
alter table public.enemies add column if not exists slug text;
alter table public.gear add column if not exists slug text;
alter table public.items add column if not exists slug text;

update public.gear
set slug = trim(both '-' from regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g'))
where slug is null or slug = '';

alter table public.locations alter column slug set not null;
alter table public.enemies alter column slug set not null;
alter table public.gear alter column slug set not null;
alter table public.items alter column slug set not null;

comment on column public.locations.slug is
  'Stable url key. Thumbnail path: locations/{slug}.png in catalog-thumbnails.';
comment on column public.enemies.slug is
  'Stable url key. Thumbnail path: enemies/{slug}.png in catalog-thumbnails.';
comment on column public.gear.slug is
  'Stable url key. Thumbnail path: gear/{slug}.png in catalog-thumbnails.';
comment on column public.items.slug is
  'Stable url key. Thumbnail path: items/{slug}.png in catalog-thumbnails.';

do $$
declare
  catalog_table text;
begin
  foreach catalog_table in array array['locations', 'enemies', 'gear', 'items']
  loop
    if not exists (
      select 1 from pg_constraint
      where conname = catalog_table || '_slug_key'
      and conrelid = ('public.' || catalog_table)::regclass
    ) then
      execute format(
        'alter table public.%I add constraint %I unique (slug)',
        catalog_table,
        catalog_table || '_slug_key'
      );
    end if;

    if not exists (
      select 1 from pg_constraint
      where conname = catalog_table || '_slug_format_check'
      and conrelid = ('public.' || catalog_table)::regclass
    ) then
      execute format(
        $sql$alter table public.%I add constraint %I check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')$sql$,
        catalog_table,
        catalog_table || '_slug_format_check'
      );
    end if;
  end loop;
end $$;

alter table public.locations drop column if exists thumbnail_url;
alter table public.enemies drop column if exists thumbnail_url;
alter table public.gear drop column if exists thumbnail_url;
alter table public.items drop column if exists thumbnail_url;
