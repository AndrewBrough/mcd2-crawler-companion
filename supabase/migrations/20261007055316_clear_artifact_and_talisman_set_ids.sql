-- Artifacts and talismans do not belong to gear sets.
update public.gear
set set_id = null
where type in ('artifact', 'talisman')
  and set_id is not null;

comment on column public.gear.set_id is
  'Set this piece belongs to. Null when the set is not known yet. Weapon sync writes the base weapon slug. Artifacts and talismans never have a set. Armor sync does not write this column.';
