alter table public.enchantments
  drop constraint enchantments_gear_types_check;

update public.enchantments
set gear_types = array_replace(gear_types, 'armor', 'armor_helmet')
where 'armor' = any (gear_types);

alter table public.enchantments
  add constraint enchantments_gear_types_check
    check (
      gear_types <> '{}'
      and array_position(gear_types, null) is null
      and gear_types <@ array[
        'melee_weapon',
        'ranged_weapon',
        'armor_helmet',
        'armor_chest',
        'armor_leggings',
        'armor_boots',
        'artifact',
        'talisman'
      ]::text[]
    );

comment on column public.enchantments.gear_types is
  'Gear this enchantment can roll on. One or more of: melee_weapon, ranged_weapon, armor_helmet, armor_chest, armor_leggings, armor_boots, artifact, talisman.';

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

  if gear_kind = any (enchantment_kinds) then
    return new;
  end if;

  raise exception
    'enchantment % is for % gear, not %',
    new.enchantment_id,
    enchantment_kinds,
    gear_kind;
end;
$$;
