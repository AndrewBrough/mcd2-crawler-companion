-- When one piece lists another in variants, copy that link back onto an empty
-- variants array, and copy the listing piece's set onto a null set_id.
with listed as (
  select
    other.slug as owner_slug,
    other.set_id as owner_set_id,
    variant_slug
  from public.gear as other
  cross join lateral unnest(other.variants) as variant_slug
),
backfill as (
  select
    variant_slug as slug,
    array_agg(distinct owner_slug order by owner_slug) as variants,
    case
      when count(distinct owner_set_id) = 1 then min(owner_set_id)
      else null
    end as set_id
  from listed
  group by variant_slug
)
update public.gear as gear
set
  variants = case
    when cardinality(gear.variants) = 0 then backfill.variants
    else gear.variants
  end,
  set_id = case
    when gear.set_id is null then backfill.set_id
    else gear.set_id
  end
from backfill
where gear.slug = backfill.slug
  and (
    cardinality(gear.variants) = 0
    or (gear.set_id is null and backfill.set_id is not null)
  );
