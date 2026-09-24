alter table public.gear
  add column type text not null;

comment on column public.gear.type is
  'Gear category. One of: melee_weapon, ranged_weapon, armor, artifact, talisman.';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'gear_type_check'
    and conrelid = 'public.gear'::regclass
  ) then
    alter table public.gear
      add constraint gear_type_check
      check (
        type in (
          'melee_weapon',
          'ranged_weapon',
          'armor',
          'artifact',
          'talisman'
        )
      );
  end if;
end $$;

create index gear_type_idx on public.gear (type);
