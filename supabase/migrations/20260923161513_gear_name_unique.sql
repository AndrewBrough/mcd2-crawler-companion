do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'gear_name_key'
    and conrelid = 'public.gear'::regclass
  ) then
    alter table public.gear
      add constraint gear_name_key unique (name);
  end if;
end $$;
