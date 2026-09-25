create table public.gear_enchantments (
  gear_id text not null references public.gear (slug) on delete cascade,
  enchantment_id text not null references public.enchantments (slug) on delete cascade,
  primary key (gear_id, enchantment_id)
);

comment on table public.gear_enchantments is
  'Enchantments that can appear on a piece of gear.';

create index gear_enchantments_enchantment_id_idx
  on public.gear_enchantments (enchantment_id);

insert into public.gear_enchantments (gear_id, enchantment_id)
select distinct gear.slug, enchantment_slug
from public.gear
cross join lateral unnest(gear.enchantments) as enchantment_slug
where enchantment_slug is not null;

drop trigger if exists gear_enchantments_exist on public.gear;
drop function if exists public.gear_enchantments_exist();

alter table public.gear
  drop constraint if exists gear_enchantments_no_nulls_check;

alter table public.gear
  drop column if exists enchantments;

create function public.gear_enchantments_type_matches()
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

  if gear_kind is distinct from enchantment_kind then
    raise exception
      'enchantment % is for % gear, not %',
      new.enchantment_id,
      enchantment_kind,
      gear_kind;
  end if;

  return new;
end;
$$;

create trigger gear_enchantments_type_matches
before insert or update on public.gear_enchantments
for each row
execute function public.gear_enchantments_type_matches();

grant select on table public.gear_enchantments to anon, authenticated;
grant select, insert, update, delete on table public.gear_enchantments to service_role;

revoke insert, update, delete on table public.gear_enchantments from anon, authenticated;

alter table public.gear_enchantments enable row level security;

create policy gear_enchantments_select_public
on public.gear_enchantments
for select
to anon, authenticated
using (true);
