alter table public.gear drop constraint if exists gear_type_check;

update public.gear
set type = case slug
  when 'test-armor' then 'armor_helmet'
  when 'test-armor-1' then 'armor_chest'
  when 'test-armor-2' then 'armor_leggings'
  when 'test-armor-3' then 'armor_boots'
  else type
end
where type = 'armor';

do $$
begin
  if exists (select 1 from public.gear where type = 'armor') then
    raise exception 'gear rows typed as armor were not mapped to a slot';
  end if;
end $$;

alter table public.gear
  add constraint gear_type_check
  check (
    type in (
      'melee_weapon',
      'ranged_weapon',
      'armor_helmet',
      'armor_chest',
      'armor_leggings',
      'armor_boots',
      'artifact',
      'talisman'
    )
  );

comment on column public.gear.type is
  'Gear category. One of: melee_weapon, ranged_weapon, armor_helmet, armor_chest, armor_leggings, armor_boots, artifact, talisman.';

create or replace function public.gear_enchantments_type_matches()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  gear_kind text;
  enchantment_kind text;
begin
  select type into gear_kind
  from public.gear
  where slug = new.gear_id;

  select gear_type into enchantment_kind
  from public.enchantments
  where slug = new.enchantment_id;

  if gear_kind is distinct from enchantment_kind
     and not (
       enchantment_kind = 'armor'
       and gear_kind in ('armor_helmet', 'armor_chest', 'armor_leggings', 'armor_boots')
     )
  then
    raise exception
      'enchantment % is for % gear, not %',
      new.enchantment_id,
      enchantment_kind,
      gear_kind;
  end if;

  return new;
end;
$$;
