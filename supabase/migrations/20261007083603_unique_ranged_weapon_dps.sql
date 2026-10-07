create table public.unique_ranged_weapon_dps (
  slug text primary key references public.gear (slug) on delete cascade,
  damage integer,
  arrows integer,
  rate numeric,
  ammo integer,
  reload numeric,
  charge_time numeric,
  charge_multiplier integer,
  constraint unique_ranged_weapon_dps_has_override_check
    check (
      damage is not null
      or arrows is not null
      or rate is not null
      or ammo is not null
      or reload is not null
      or charge_time is not null
      or charge_multiplier is not null
    )
);

comment on table public.unique_ranged_weapon_dps is
  'Stat overrides for a unique ranged weapon. Null columns fall back to ranged_weapon_dps for that gear set.';
comment on column public.unique_ranged_weapon_dps.slug is
  'Unique gear slug. The set to fall back to is gear.set_id.';
comment on column public.unique_ranged_weapon_dps.charge_time is
  'Replacement charge time in seconds. Null when this unique uses the set charge time.';

grant select on table public.unique_ranged_weapon_dps to anon, authenticated;
grant select, insert, update, delete on table public.unique_ranged_weapon_dps to service_role;

revoke insert, update, delete on table public.unique_ranged_weapon_dps from anon, authenticated;

alter table public.unique_ranged_weapon_dps enable row level security;

create policy unique_ranged_weapon_dps_select_public
on public.unique_ranged_weapon_dps
for select
to anon, authenticated
using (true);

insert into public.unique_ranged_weapon_dps (slug, reload, charge_time)
values
  ('rangers-promise', 0.8, 0.3);
