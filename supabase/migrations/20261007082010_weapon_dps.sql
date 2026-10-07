create table public.weapon_dps (
  slug text primary key references public.sets (slug) on delete cascade,
  combo text[] not null,
  total integer not null,
  combo_time numeric not null,
  base_dps numeric not null,
  jump integer not null,
  reach integer not null,
  constraint weapon_dps_combo_no_nulls_check
    check (cardinality(combo) > 0 and array_position(combo, null) is null)
);

comment on table public.weapon_dps is
  'Base melee weapon combo and DPS, one row per gear set.';
comment on column public.weapon_dps.slug is
  'Set this stat row belongs to. Matches public.sets.slug and gear.set_id.';
comment on column public.weapon_dps.combo is
  'Damage of each hit. A value like 12 x2 means that swing hits twice.';
comment on column public.weapon_dps.combo_time is
  'Seconds for the full combo if attacks are chained.';

grant select on table public.weapon_dps to anon, authenticated;
grant select, insert, update, delete on table public.weapon_dps to service_role;

revoke insert, update, delete on table public.weapon_dps from anon, authenticated;

alter table public.weapon_dps enable row level security;

create policy weapon_dps_select_public
on public.weapon_dps
for select
to anon, authenticated
using (true);

insert into public.weapon_dps (slug, combo, total, combo_time, base_dps, jump, reach)
values
  ('twilight-dagger', array['25'], 25, 0.25, 100, 28, 280),
  ('wolf-claws', array['12 x2', '12 x2', '16 x2'], 80, 1.84, 43.4, 12, 180),
  ('double-sickles', array['9 x2', '9 x2', '13 x2'], 62, 1.46, 42.6, 24, 300),
  ('rapier', array['6 x3', '8 x3', '28'], 70, 2.02, 34.7, 22, 425),
  ('double-daggers', array['6 x2', '6 x2', '9 x2'], 42, 1.45, 29, 14, 275),
  ('riftslasher', array['14', '14', '15 x2'], 58, 1.17, 49.7, 20, 320),
  ('short-spear', array['14', '8 x3'], 38, 0.93, 40.7, 22, 450),
  ('axe', array['14', '16', '22'], 52, 1.4, 37.1, 21, 350),
  ('sword', array['14', '16', '22'], 52, 1.48, 35.1, 24, 385),
  ('meat-cleaver', array['13', '13', '18'], 44, 1.31, 33.5, 20, 350),
  ('sabre', array['12', '14', '22'], 48, 1.44, 33.2, 20, 350),
  ('longsword', array['18', '18', '26'], 62, 1.88, 33, 22, 475),
  ('scythe', array['22', '26', '30'], 78, 2.4, 32.5, 24, 350),
  ('pike', array['15', '17', '22'], 54, 1.71, 31.5, 24, 525),
  ('pickaxe', array['16', '16', '24'], 56, 1.79, 31.4, 28, 300),
  ('battle-hammer', array['15', '15', '25'], 55, 1.77, 31, 30, 300),
  ('mace', array['14', '16', '24'], 54, 1.81, 29.8, 35, 250),
  ('war-hammer', array['40'], 40, 0.96, 41.6, 40, 250),
  ('mob-mallet', array['18 x5', '24'], 114, 2.82, 40.5, 24, 450),
  ('battlestaff', array['26', '26', '30'], 82, 2.32, 35.3, 26, 450),
  ('shovel', array['15', '15', '60'], 90, 2.58, 34.9, 30, 400),
  ('cookiecutter', array['20', '20', '30'], 70, 2.05, 34.2, 20, 500),
  ('greataxe', array['28', '30'], 58, 1.75, 33.1, 24, 350),
  ('glaive', array['18', '20', '28'], 66, 2.0, 32.9, 24, 350),
  ('tidal-sickle', array['12', '12', '19'], 43, 1.35, 31.8, 22, 300),
  ('claymore', array['15', '25', '20'], 60, 1.92, 31.3, 25, 385),
  ('greatsword', array['18 x3'], 54, 1.88, 28.7, 18, 400),
  ('clobberer', array['35'], 35, 1.4, 25, 28, 400),
  ('gauntlets', array['9 x2', '9 x2', '12 x2'], 60, 1.52, 39.5, 22, 275);
