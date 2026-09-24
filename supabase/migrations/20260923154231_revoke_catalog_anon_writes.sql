revoke insert, update, delete on table
  public.locations,
  public.enemies,
  public.gear,
  public.items,
  public.location_enemies,
  public.location_relations,
  public.location_gear_drops,
  public.location_item_drops,
  public.enemy_gear_drops,
  public.enemy_item_drops
from anon, authenticated;
