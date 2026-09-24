insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalog-thumbnails',
  'catalog-thumbnails',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy catalog_thumbnails_select_public
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'catalog-thumbnails');
