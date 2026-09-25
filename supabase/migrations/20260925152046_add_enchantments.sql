create table public.enchantments (
  slug text primary key,
  name text not null,
  description text not null default '',
  gear_type text not null,
  constraint enchantments_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint enchantments_name_key unique (name),
  constraint enchantments_gear_type_check
    check (
      gear_type in (
        'melee_weapon',
        'ranged_weapon',
        'armor',
        'artifact',
        'talisman'
      )
    )
);

comment on column public.enchantments.slug is
  'Primary key. Immutable.';
comment on column public.enchantments.gear_type is
  'Gear category this enchantment applies to. One of: melee_weapon, ranged_weapon, armor, artifact, talisman.';

create index enchantments_gear_type_idx on public.enchantments (gear_type);

alter table public.gear
  add column enchantments text[] not null default '{}';

comment on column public.gear.enchantments is
  'Enchantment slugs that can appear on this gear. Empty by default.';

alter table public.gear
  add constraint gear_enchantments_no_nulls_check
  check (array_position(enchantments, null) is null);

create function public.gear_enchantments_exist()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if exists (
    select 1
    from unnest(new.enchantments) as enchantment_slug
    where not exists (
      select 1
      from public.enchantments as enchantment
      where enchantment.slug = enchantment_slug
    )
  ) then
    raise exception 'gear.enchantments must contain only existing enchantment slugs';
  end if;

  return new;
end;
$$;

create trigger gear_enchantments_exist
before insert or update of enchantments on public.gear
for each row
execute function public.gear_enchantments_exist();

grant select on table public.enchantments to anon, authenticated;
grant select, insert, update, delete on table public.enchantments to service_role;

revoke insert, update, delete on table public.enchantments from anon, authenticated;

alter table public.enchantments enable row level security;

create policy enchantments_select_public
on public.enchantments
for select
to anon, authenticated
using (true);
