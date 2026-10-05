insert into public.archetypes (slug, name)
values
  ('melee', 'Melee'),
  ('melee-ranged', 'Melee and Ranged'),
  ('ranged', 'Ranged'),
  ('crossbow', 'Crossbow'),
  ('bow-quiver', 'Bow and Quiver'),
  ('quiver', 'Quiver'),
  ('artifact', 'Artifact');

insert into public.archetype_effects (archetype_id, effect_id)
values
  ('melee', 'brawler'),
  ('melee', 'duelist'),
  ('melee', 'finesse'),
  ('melee', 'precision'),
  ('melee', 'sharpness'),
  ('melee', 'strength'),
  ('melee-ranged', 'bounty-hunter'),
  ('melee-ranged', 'bully'),
  ('melee-ranged', 'critical-edge'),
  ('melee-ranged', 'critical-hit'),
  ('melee-ranged', 'knockback'),
  ('melee-ranged', 'looter'),
  ('melee-ranged', 'momentum'),
  ('melee-ranged', 'pack-leader'),
  ('melee-ranged', 'persistence'),
  ('melee-ranged', 'raider'),
  ('melee-ranged', 'reaper'),
  ('melee-ranged', 'shackler'),
  ('melee-ranged', 'vanguard'),
  ('ranged', 'aim'),
  ('ranged', 'marksman'),
  ('ranged', 'point-blank'),
  ('ranged', 'ranger'),
  ('ranged', 'sniper'),
  ('ranged', 'impact'),
  ('crossbow', 'reload'),
  ('bow-quiver', 'sharpshooter'),
  ('quiver', 'quiver'),
  ('quiver', 'impact'),
  ('artifact', 'ally'),
  ('artifact', 'cooldown'),
  ('artifact', 'cryomancer'),
  ('artifact', 'electromancer'),
  ('artifact', 'healer'),
  ('artifact', 'pyromancer'),
  ('artifact', 'shepherd'),
  ('artifact', 'sorcerer'),
  ('artifact', 'soulmancer'),
  ('artifact', 'spiritual'),
  ('artifact', 'totem-radius'),
  ('artifact', 'venomancer'),
  ('artifact', 'veterinarian'),
  ('artifact', 'impact');

insert into public.sets (slug, name)
values
  ('melee', 'Melee'),
  ('bow', 'Bow'),
  ('crossbow', 'Crossbow'),
  ('quiver', 'Quiver'),
  ('artifact', 'Artifact');

insert into public.set_archetypes (set_id, archetype_id)
values
  ('melee', 'melee'),
  ('melee', 'melee-ranged'),
  ('bow', 'ranged'),
  ('bow', 'melee-ranged'),
  ('bow', 'bow-quiver'),
  ('crossbow', 'ranged'),
  ('crossbow', 'melee-ranged'),
  ('crossbow', 'crossbow'),
  ('quiver', 'bow-quiver'),
  ('quiver', 'quiver'),
  ('artifact', 'artifact');

update public.gear
set set_id = 'melee'
where type = 'melee_weapon'
  and set_id is null;

update public.gear
set set_id = 'bow'
where set_id is null
  and slug in (
    'bow',
    'rangers-promise',
    'greatbow',
    'humbler-heartstring',
    'longbow',
    'creakings-reach',
    'powerbow',
    'paragon',
    'shortbow',
    'shooting-star',
    'trickbow',
    'phantom-wing'
  );

update public.gear
set set_id = 'crossbow'
where set_id is null
  and slug in (
    'crossbow',
    'the-shackler',
    'dual-crossbows',
    'double-crossers',
    'heavy-crossbow',
    'the-close-ranger',
    'rapid-crossbow',
    'the-cross-pollinator',
    'scatter-crossbow',
    'harp-crossbow'
  );

update public.gear
set set_id = 'quiver'
where type = 'artifact'
  and name ilike '%quiver%'
  and set_id is null;

update public.gear
set set_id = 'artifact'
where type = 'artifact'
  and set_id is null;
