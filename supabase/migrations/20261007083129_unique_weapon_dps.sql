create table public.unique_weapon_dps (
  slug text primary key references public.gear (slug) on delete cascade,
  combo text[],
  total integer,
  combo_time numeric,
  base_dps numeric,
  jump integer,
  reach integer,
  constraint unique_weapon_dps_has_override_check
    check (
      combo is not null
      or total is not null
      or combo_time is not null
      or base_dps is not null
      or jump is not null
      or reach is not null
    ),
  constraint unique_weapon_dps_combo_no_nulls_check
    check (
      combo is null
      or (cardinality(combo) > 0 and array_position(combo, null) is null)
    )
);

comment on table public.unique_weapon_dps is
  'Stat overrides for a unique melee weapon. Null columns fall back to weapon_dps for that gear set.';
comment on column public.unique_weapon_dps.slug is
  'Unique gear slug. The set to fall back to is gear.set_id.';
comment on column public.unique_weapon_dps.combo is
  'Replacement combo. Null when this unique uses the set combo.';

grant select on table public.unique_weapon_dps to anon, authenticated;
grant select, insert, update, delete on table public.unique_weapon_dps to service_role;

revoke insert, update, delete on table public.unique_weapon_dps from anon, authenticated;

alter table public.unique_weapon_dps enable row level security;

create policy unique_weapon_dps_select_public
on public.unique_weapon_dps
for select
to anon, authenticated
using (true);

insert into public.unique_weapon_dps (slug, combo, total, base_dps, jump, reach)
values
  ('awesomeaxe', null, null, null, null, 330),
  ('carapace-mace', null, null, null, null, 300),
  ('elemental-staff', array['24', '24', '30'], 78, 33.6, null, null),
  ('heartbreaker', null, null, null, null, 300),
  ('hunters-hatchet', array['14', '14', '21'], 49, 36.1, 22, null),
  ('lullaby-blade', null, null, 32.8, null, 385),
  ('lunar-sickle', array['15', '15', '23'], 53, 37.5, null, null),
  ('monster-masher', array['16 x5', '24'], 104, 36.5, 18, null),
  ('pride-of-the-plains', null, null, 51.1, null, null),
  ('prime-enchanters-gauntlets', array['5 x2', '5.5 x2', '7 x2'], 35, 17.6, 24, null),
  ('rascals-razor', null, null, 35.3, null, null),
  ('redstone-wrecker', null, null, 27.9, null, null),
  ('spectral-spear', null, null, 44.2, null, null),
  ('stormcaller', null, null, 27, null, null),
  ('the-burning-blade', array['14', '14', '20'], 48, 32.4, null, null),
  ('venomous-fangs', null, null, null, null, 285);
