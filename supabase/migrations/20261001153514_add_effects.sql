create table public.effects (
  slug text primary key,
  name text not null,
  description text not null default '',
  level_1 numeric(5, 2),
  level_2 numeric(5, 2),
  level_3 numeric(5, 2),
  unique_level numeric(5, 2),
  gear_slugs text[] not null default '{}',
  unique_bound text[] not null default '{}',
  created_at timestamptz not null default now(),
  constraint effects_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint effects_name_key unique (name),
  constraint effects_level_1_check
    check (level_1 is null or (level_1 >= 0 and level_1 <= 100)),
  constraint effects_level_2_check
    check (level_2 is null or (level_2 >= 0 and level_2 <= 100)),
  constraint effects_level_3_check
    check (level_3 is null or (level_3 >= 0 and level_3 <= 100)),
  constraint effects_unique_level_check
    check (unique_level is null or (unique_level >= 0 and unique_level <= 100)),
  constraint effects_gear_slugs_no_nulls_check
    check (array_position(gear_slugs, null) is null),
  constraint effects_unique_bound_no_nulls_check
    check (array_position(unique_bound, null) is null)
);

comment on table public.effects is
  'Gear effects scraped from the Minecraft Wiki Dungeons II:Effect page.';
comment on column public.effects.slug is
  'Primary key derived from the effect name.';
comment on column public.effects.level_1 is
  'Tier I effectiveness percent. Null when the effect has no random tier.';
comment on column public.effects.level_2 is
  'Tier II effectiveness percent. Null when the effect has no random tier.';
comment on column public.effects.level_3 is
  'Tier III effectiveness percent. Null when the effect has no random tier.';
comment on column public.effects.unique_level is
  'Fixed unique effectiveness percent. Null when the effect has no unique amount.';
comment on column public.effects.gear_slugs is
  'Slugs for the wiki gear categories this effect can roll on, such as armor, melee, bow, crossbow, artifact, quiver, or unique-only.';
comment on column public.effects.unique_bound is
  'Gear slugs whose fixed unique bonus is this effect. Not validated against gear.';

grant select on table public.effects to anon, authenticated;
grant select, insert, update, delete on table public.effects to service_role;

revoke insert, update, delete on table public.effects from anon, authenticated;

alter table public.effects enable row level security;

create policy effects_select_public
on public.effects
for select
to anon, authenticated
using (true);
