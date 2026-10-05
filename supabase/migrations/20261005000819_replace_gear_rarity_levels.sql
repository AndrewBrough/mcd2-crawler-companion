alter table public.gear drop constraint if exists gear_rarity_check;

alter table public.gear alter column rarity drop default;

alter table public.gear
  alter column rarity type text[]
  using (
    case
      when rarity = 'unique' then array['unique']::text[]
      else array['common', 'rare', 'special']::text[]
    end
  );

alter table public.gear
  alter column rarity set default array['common', 'rare', 'special']::text[];

alter table public.gear
  add constraint gear_rarity_check
  check (
    cardinality(rarity) > 0
    and rarity <@ array['common', 'rare', 'special', 'unique']::text[]
    and (
      rarity = array['unique']::text[]
      or not ('unique' = any (rarity))
    )
  );

comment on column public.gear.rarity is
  'Rarities this gear can drop as. Unique items are only unique. Every other item can drop as common, rare, or special.';
