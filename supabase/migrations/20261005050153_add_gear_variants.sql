alter table public.gear
  add column variants text[] not null default '{}';

alter table public.gear
  add constraint gear_variants_check
  check (
    array_position(variants, null) is null
    and variants::text ~ '^(\{\}|\{([a-z0-9]+(?:-[a-z0-9]+)*)(,[a-z0-9]+(?:-[a-z0-9]+)*)*\})$'
  );

comment on column public.gear.variants is
  'Other gear slugs from the wiki infobox variant field. Empty when that field is blank. Gear scrapes write this column and do not write set_id.';
