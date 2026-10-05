delete from public.enchantments
where slug in ('test-enchantment', 'test-enchantment-1', 'test-enchantment-2');

drop index if exists public.enchantments_gear_type_idx;

alter table public.enchantments
  drop column gear_type;

alter table public.enchantments
  add column gear_types text[] not null,
  add column tier_1 text not null default '',
  add column tier_2 text not null default '',
  add column tier_3 text not null default '',
  add column categories text[] not null default '{}',
  add column sources text[] not null default '{}';

alter table public.enchantments
  add constraint enchantments_gear_types_check
    check (
      gear_types <> '{}'
      and array_position(gear_types, null) is null
      and gear_types <@ array[
        'melee_weapon',
        'ranged_weapon',
        'armor',
        'artifact',
        'talisman'
      ]::text[]
    ),
  add constraint enchantments_categories_no_nulls_check
    check (array_position(categories, null) is null),
  add constraint enchantments_sources_no_nulls_check
    check (array_position(sources, null) is null);

comment on column public.enchantments.gear_types is
  'Wiki sections this enchantment appears in. One or more of: melee_weapon, ranged_weapon, armor, artifact, talisman. Armor slots use armor.';
comment on column public.enchantments.tier_1 is
  'Tier I text from the wiki. Not a single percent.';
comment on column public.enchantments.tier_2 is
  'Tier II text from the wiki. Not a single percent.';
comment on column public.enchantments.tier_3 is
  'Tier III text from the wiki. Not a single percent.';
comment on column public.enchantments.categories is
  'Distinct category labels from the wiki, such as Attack or Utility.';
comment on column public.enchantments.sources is
  'Distinct non-empty Obtained from cells from the wiki.';

create index enchantments_gear_types_idx
  on public.enchantments
  using gin (gear_types);

create or replace function public.gear_enchantments_type_matches()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  gear_kind text;
  enchantment_kinds text[];
begin
  select type into gear_kind
  from public.gear
  where slug = new.gear_id;

  select gear_types into enchantment_kinds
  from public.enchantments
  where slug = new.enchantment_id;

  if gear_kind = any (enchantment_kinds)
     or (
       gear_kind in ('armor_helmet', 'armor_chest', 'armor_leggings', 'armor_boots')
       and 'armor' = any (enchantment_kinds)
     )
  then
    return new;
  end if;

  raise exception
    'enchantment % is for % gear, not %',
    new.enchantment_id,
    enchantment_kinds,
    gear_kind;
end;
$$;
