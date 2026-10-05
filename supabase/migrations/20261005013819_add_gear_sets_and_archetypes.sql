create table public.archetypes (
  slug text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  constraint archetypes_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint archetypes_name_key unique (name)
);

comment on table public.archetypes is
  'Effect-pool tags such as Fighter or Lightning. A set can have more than one.';

create table public.archetype_effects (
  archetype_id text not null references public.archetypes (slug) on delete cascade,
  effect_id text not null references public.effects (slug) on delete cascade,
  primary key (archetype_id, effect_id)
);

comment on table public.archetype_effects is
  'Effects that can roll on gear whose set includes this archetype.';

create index archetype_effects_effect_id_idx
  on public.archetype_effects (effect_id);

create table public.sets (
  slug text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  constraint sets_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint sets_name_key unique (name)
);

comment on table public.sets is
  'Named gear sets. Armor sets point at archetypes. Other gear, such as quivers, can point straight at effects.';

create table public.set_archetypes (
  set_id text not null references public.sets (slug) on delete cascade,
  archetype_id text not null references public.archetypes (slug) on delete cascade,
  primary key (set_id, archetype_id)
);

comment on table public.set_archetypes is
  'Archetypes that decide the effect pool for a set.';

create index set_archetypes_archetype_id_idx
  on public.set_archetypes (archetype_id);

create table public.set_effects (
  set_id text not null references public.sets (slug) on delete cascade,
  effect_id text not null references public.effects (slug) on delete cascade,
  primary key (set_id, effect_id)
);

comment on table public.set_effects is
  'Effects a set can roll without going through an archetype. Empty until a set such as quiver is linked by hand.';

create index set_effects_effect_id_idx
  on public.set_effects (effect_id);

alter table public.gear
  add column set_id text references public.sets (slug) on delete set null;

comment on column public.gear.set_id is
  'Set this piece belongs to. Null when the set is not known yet. Wiki scrapes do not write this column.';

create index gear_set_id_idx
  on public.gear (set_id);

insert into public.archetypes (slug, name)
values
  ('fighter', 'Fighter'),
  ('ranger', 'Ranger'),
  ('tank', 'Tank'),
  ('trickster', 'Trickster'),
  ('mage', 'Mage'),
  ('support', 'Support'),
  ('summoner', 'Summoner'),
  ('utility', 'Utility'),
  ('lightning', 'Lightning'),
  ('fire', 'Fire'),
  ('frost', 'Frost'),
  ('poison', 'Poison');

insert into public.archetype_effects (archetype_id, effect_id)
values
  ('fighter', 'swiftness'),
  ('fighter', 'precision'),
  ('fighter', 'strength'),
  ('fighter', 'finesse'),
  ('fighter', 'duelist'),
  ('fighter', 'vanguard'),
  ('fighter', 'bounty-hunter'),
  ('fighter', 'protection'),
  ('fighter', 'projectile-protection'),
  ('ranger', 'speed'),
  ('ranger', 'fletcher'),
  ('ranger', 'aim'),
  ('ranger', 'marksman'),
  ('ranger', 'sniper'),
  ('ranger', 'ranger'),
  ('ranger', 'bowyer'),
  ('ranger', 'evasion'),
  ('ranger', 'projectile-protection'),
  ('ranger', 'sharpshooter'),
  ('ranger', 'quiver'),
  ('tank', 'recovery'),
  ('tank', 'momentum'),
  ('tank', 'regeneration'),
  ('tank', 'brawler'),
  ('tank', 'prickly'),
  ('tank', 'potion-maker'),
  ('tank', 'point-blank'),
  ('tank', 'resilience'),
  ('tank', 'protection'),
  ('tank', 'projectile-protection'),
  ('trickster', 'assassin'),
  ('trickster', 'prowler'),
  ('trickster', 'acrobat'),
  ('trickster', 'stealth'),
  ('trickster', 'bounty-hunter'),
  ('trickster', 'finesse'),
  ('trickster', 'deflection'),
  ('trickster', 'evasion'),
  ('trickster', 'strength'),
  ('trickster', 'marksman'),
  ('mage', 'sorcerer'),
  ('mage', 'cooldown'),
  ('mage', 'pyromancer'),
  ('mage', 'electromancer'),
  ('mage', 'venomancer'),
  ('mage', 'soulmancer'),
  ('mage', 'cryomancer'),
  ('mage', 'reaper'),
  ('mage', 'spiritual'),
  ('mage', 'elemental-protection'),
  ('support', 'totem-radius'),
  ('support', 'bully'),
  ('support', 'potion-maker'),
  ('support', 'ally'),
  ('support', 'tainted'),
  ('support', 'shackler'),
  ('support', 'healer'),
  ('support', 'reaper'),
  ('summoner', 'pack-leader'),
  ('summoner', 'shepherd'),
  ('summoner', 'veterinarian'),
  ('summoner', 'healer'),
  ('summoner', 'ally'),
  ('summoner', 'reaper'),
  ('utility', 'looter'),
  ('utility', 'raider'),
  ('utility', 'prospector'),
  ('utility', 'luck');

insert into public.sets (slug, name)
values
  ('ranger', 'Ranger'),
  ('wolfpack', 'Wolfpack'),
  ('nomad', 'Nomad'),
  ('scamp', 'Scamp'),
  ('protector', 'Protector'),
  ('bounty-hunter', 'Bounty Hunter'),
  ('beekeeper', 'Beekeeper'),
  ('mystic', 'Mystic'),
  ('sorcerer', 'Sorcerer'),
  ('disciple', 'Disciple'),
  ('phantom', 'Phantom'),
  ('sculk-digger', 'Sculk Digger'),
  ('sculker', 'Sculker'),
  ('realmreacher', 'Realmreacher'),
  ('treehugger', 'Treehugger'),
  ('redstone', 'Redstone'),
  ('steel-wool', 'Steel Wool'),
  ('mushroom', 'Mushroom');

insert into public.set_archetypes (set_id, archetype_id)
values
  ('ranger', 'ranger'),
  ('wolfpack', 'summoner'),
  ('nomad', 'fighter'),
  ('scamp', 'trickster'),
  ('protector', 'tank'),
  ('bounty-hunter', 'tank'),
  ('beekeeper', 'support'),
  ('mystic', 'mage'),
  ('sorcerer', 'mage'),
  ('sorcerer', 'lightning'),
  ('disciple', 'fighter'),
  ('disciple', 'trickster'),
  ('phantom', 'ranger'),
  ('phantom', 'trickster'),
  ('sculk-digger', 'tank'),
  ('sculk-digger', 'trickster'),
  ('sculker', 'mage'),
  ('sculker', 'trickster'),
  ('realmreacher', 'mage'),
  ('realmreacher', 'ranger'),
  ('treehugger', 'support'),
  ('treehugger', 'summoner'),
  ('redstone', 'mage'),
  ('redstone', 'tank'),
  ('redstone', 'fire'),
  ('steel-wool', 'mage'),
  ('steel-wool', 'tank'),
  ('steel-wool', 'frost'),
  ('mushroom', 'mage'),
  ('mushroom', 'tank'),
  ('mushroom', 'utility'),
  ('mushroom', 'poison');

update public.gear as gear
set set_id = match.set_id
from (
  select distinct on (piece.slug)
    piece.slug as gear_slug,
    sets.slug as set_id
  from public.gear as piece
  join public.sets as sets
    on piece.name ilike sets.name || ' %'
  where piece.type in ('armor_helmet', 'armor_chest', 'armor_leggings', 'armor_boots')
  order by piece.slug, length(sets.name) desc
) as match
where gear.slug = match.gear_slug;

grant select on table public.archetypes to anon, authenticated;
grant select, insert, update, delete on table public.archetypes to service_role;
revoke insert, update, delete on table public.archetypes from anon, authenticated;
alter table public.archetypes enable row level security;
create policy archetypes_select_public
  on public.archetypes for select to anon, authenticated using (true);

grant select on table public.archetype_effects to anon, authenticated;
grant select, insert, update, delete on table public.archetype_effects to service_role;
revoke insert, update, delete on table public.archetype_effects from anon, authenticated;
alter table public.archetype_effects enable row level security;
create policy archetype_effects_select_public
  on public.archetype_effects for select to anon, authenticated using (true);

grant select on table public.sets to anon, authenticated;
grant select, insert, update, delete on table public.sets to service_role;
revoke insert, update, delete on table public.sets from anon, authenticated;
alter table public.sets enable row level security;
create policy sets_select_public
  on public.sets for select to anon, authenticated using (true);

grant select on table public.set_archetypes to anon, authenticated;
grant select, insert, update, delete on table public.set_archetypes to service_role;
revoke insert, update, delete on table public.set_archetypes from anon, authenticated;
alter table public.set_archetypes enable row level security;
create policy set_archetypes_select_public
  on public.set_archetypes for select to anon, authenticated using (true);

grant select on table public.set_effects to anon, authenticated;
grant select, insert, update, delete on table public.set_effects to service_role;
revoke insert, update, delete on table public.set_effects from anon, authenticated;
alter table public.set_effects enable row level security;
create policy set_effects_select_public
  on public.set_effects for select to anon, authenticated using (true);
