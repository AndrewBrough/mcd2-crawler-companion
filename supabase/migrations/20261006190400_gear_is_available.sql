alter table public.gear
  add column is_available boolean not null default true;

comment on column public.gear.is_available is
  'When false, anon and authenticated clients cannot read the row. Sync upserts do not write this column, so a manual false value survives the next scrape.';

alter policy gear_select_public
  on public.gear
  using (is_available);
