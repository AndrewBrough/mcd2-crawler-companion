alter table public.gear
  add column rarity text not null default 'regular';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'gear_rarity_check'
      and conrelid = 'public.gear'::regclass
  ) then
    alter table public.gear
      add constraint gear_rarity_check
      check (rarity in ('regular', 'unique'));
  end if;
end $$;

comment on column public.gear.rarity is
  'Item rarity. unique for distinctive named variants, regular for every other drop.';
