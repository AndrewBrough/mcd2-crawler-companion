create table public.ranged_weapon_dps (
  slug text primary key references public.sets (slug) on delete cascade,
  damage integer not null,
  arrows integer not null,
  rate numeric not null,
  ammo integer not null,
  reload numeric not null,
  charge_time numeric,
  charge_multiplier integer,
  constraint ranged_weapon_dps_charge_check
    check (
      (charge_time is null and charge_multiplier is null)
      or (
        charge_time is not null
        and charge_multiplier is not null
        and charge_time > 0
        and charge_multiplier > 0
      )
    )
);

comment on table public.ranged_weapon_dps is
  'Base ranged weapon stats, one row per gear set.';
comment on column public.ranged_weapon_dps.slug is
  'Set this stat row belongs to. Matches public.sets.slug and gear.set_id.';
comment on column public.ranged_weapon_dps.damage is
  'Damage per arrow.';
comment on column public.ranged_weapon_dps.rate is
  'Seconds between shots.';
comment on column public.ranged_weapon_dps.reload is
  'Seconds to reload.';
comment on column public.ranged_weapon_dps.charge_time is
  'Seconds to fully charge. Null when the weapon cannot charge.';
comment on column public.ranged_weapon_dps.charge_multiplier is
  'Damage multiplier when fully charged. Null when the weapon cannot charge.';

grant select on table public.ranged_weapon_dps to anon, authenticated;
grant select, insert, update, delete on table public.ranged_weapon_dps to service_role;

revoke insert, update, delete on table public.ranged_weapon_dps from anon, authenticated;

alter table public.ranged_weapon_dps enable row level security;

create policy ranged_weapon_dps_select_public
on public.ranged_weapon_dps
for select
to anon, authenticated
using (true);

insert into public.ranged_weapon_dps (
  slug,
  damage,
  arrows,
  rate,
  ammo,
  reload,
  charge_time,
  charge_multiplier
)
values
  ('bow', 18, 1, 0.4, 15, 1.2, 0.35, 3),
  ('crossbow', 24, 1, 0.6, 15, 1.5, null, null),
  ('dual-crossbows', 12, 2, 0.6, 20, 1, null, null),
  ('greatbow', 72, 1, 0.4, 10, 1.2, 0.3, 4),
  ('heavy-crossbow', 108, 1, 0.95, 8, 2, null, null),
  ('longbow', 25, 1, 0.5, 12, 1.5, 0.4, 3),
  ('powerbow', 40, 1, 0.5, 12, 1.5, 0.4, 4),
  ('rapid-crossbow', 8, 1, 0.2, 25, 0.8, null, null),
  ('scatter-crossbow', 12, 3, 0.4, 12, 1.5, null, null),
  ('shortbow', 11, 1, 0.2, 18, 1, 0.125, 3),
  ('trickbow', 14, 1, 0.3, 15, 1.2, 0.2, 3);
