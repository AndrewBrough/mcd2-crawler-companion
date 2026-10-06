insert into public.sets (slug, name)
values
  ($txt$axe$txt$, $txt$Axe$txt$),
  ($txt$battlestaff$txt$, $txt$Battlestaff$txt$),
  ($txt$battle-hammer$txt$, $txt$Battle Hammer$txt$),
  ($txt$claymore$txt$, $txt$Claymore$txt$),
  ($txt$clobberer$txt$, $txt$Clobberer$txt$),
  ($txt$cookiecutter$txt$, $txt$Cookiecutter$txt$),
  ($txt$double-daggers$txt$, $txt$Double Daggers$txt$),
  ($txt$double-sickles$txt$, $txt$Double Sickles$txt$),
  ($txt$gauntlets$txt$, $txt$Gauntlets$txt$),
  ($txt$glaive$txt$, $txt$Glaive$txt$),
  ($txt$greataxe$txt$, $txt$Greataxe$txt$),
  ($txt$greatsword$txt$, $txt$Greatsword$txt$),
  ($txt$longsword$txt$, $txt$Longsword$txt$),
  ($txt$mace$txt$, $txt$Mace$txt$),
  ($txt$meat-cleaver$txt$, $txt$Meat Cleaver$txt$),
  ($txt$mob-mallet$txt$, $txt$Mob Mallet$txt$),
  ($txt$pickaxe$txt$, $txt$Pickaxe$txt$),
  ($txt$pike$txt$, $txt$Pike$txt$),
  ($txt$rapier$txt$, $txt$Rapier$txt$),
  ($txt$riftslasher$txt$, $txt$Riftslasher$txt$),
  ($txt$sabre$txt$, $txt$Sabre$txt$),
  ($txt$scythe$txt$, $txt$Scythe$txt$),
  ($txt$short-spear$txt$, $txt$Short Spear$txt$),
  ($txt$shovel$txt$, $txt$Shovel$txt$),
  ($txt$sword$txt$, $txt$Sword$txt$),
  ($txt$tidal-sickle$txt$, $txt$Tidal Sickle$txt$),
  ($txt$twilight-dagger$txt$, $txt$Twilight Dagger$txt$),
  ($txt$war-hammer$txt$, $txt$War Hammer$txt$),
  ($txt$wolf-claws$txt$, $txt$Wolf Claws$txt$),
  ($txt$bow$txt$, $txt$Bow$txt$),
  ($txt$greatbow$txt$, $txt$Greatbow$txt$),
  ($txt$longbow$txt$, $txt$Longbow$txt$),
  ($txt$powerbow$txt$, $txt$Powerbow$txt$),
  ($txt$shortbow$txt$, $txt$Shortbow$txt$),
  ($txt$trickbow$txt$, $txt$Trickbow$txt$),
  ($txt$crossbow$txt$, $txt$Crossbow$txt$),
  ($txt$dual-crossbows$txt$, $txt$Dual Crossbows$txt$),
  ($txt$heavy-crossbow$txt$, $txt$Heavy Crossbow$txt$),
  ($txt$rapid-crossbow$txt$, $txt$Rapid Crossbow$txt$),
  ($txt$scatter-crossbow$txt$, $txt$Scatter Crossbow$txt$)
on conflict (slug) do nothing;

insert into public.set_archetypes (set_id, archetype_id)
select weapon.set_id, pool.archetype_id
from (
  values
    ($txt$axe$txt$, $txt$melee$txt$),
  ($txt$battlestaff$txt$, $txt$melee$txt$),
  ($txt$battle-hammer$txt$, $txt$melee$txt$),
  ($txt$claymore$txt$, $txt$melee$txt$),
  ($txt$clobberer$txt$, $txt$melee$txt$),
  ($txt$cookiecutter$txt$, $txt$melee$txt$),
  ($txt$double-daggers$txt$, $txt$melee$txt$),
  ($txt$double-sickles$txt$, $txt$melee$txt$),
  ($txt$gauntlets$txt$, $txt$melee$txt$),
  ($txt$glaive$txt$, $txt$melee$txt$),
  ($txt$greataxe$txt$, $txt$melee$txt$),
  ($txt$greatsword$txt$, $txt$melee$txt$),
  ($txt$longsword$txt$, $txt$melee$txt$),
  ($txt$mace$txt$, $txt$melee$txt$),
  ($txt$meat-cleaver$txt$, $txt$melee$txt$),
  ($txt$mob-mallet$txt$, $txt$melee$txt$),
  ($txt$pickaxe$txt$, $txt$melee$txt$),
  ($txt$pike$txt$, $txt$melee$txt$),
  ($txt$rapier$txt$, $txt$melee$txt$),
  ($txt$riftslasher$txt$, $txt$melee$txt$),
  ($txt$sabre$txt$, $txt$melee$txt$),
  ($txt$scythe$txt$, $txt$melee$txt$),
  ($txt$short-spear$txt$, $txt$melee$txt$),
  ($txt$shovel$txt$, $txt$melee$txt$),
  ($txt$sword$txt$, $txt$melee$txt$),
  ($txt$tidal-sickle$txt$, $txt$melee$txt$),
  ($txt$twilight-dagger$txt$, $txt$melee$txt$),
  ($txt$war-hammer$txt$, $txt$melee$txt$),
  ($txt$wolf-claws$txt$, $txt$melee$txt$),
  ($txt$bow$txt$, $txt$bow$txt$),
  ($txt$greatbow$txt$, $txt$bow$txt$),
  ($txt$longbow$txt$, $txt$bow$txt$),
  ($txt$powerbow$txt$, $txt$bow$txt$),
  ($txt$shortbow$txt$, $txt$bow$txt$),
  ($txt$trickbow$txt$, $txt$bow$txt$),
  ($txt$crossbow$txt$, $txt$crossbow$txt$),
  ($txt$dual-crossbows$txt$, $txt$crossbow$txt$),
  ($txt$heavy-crossbow$txt$, $txt$crossbow$txt$),
  ($txt$rapid-crossbow$txt$, $txt$crossbow$txt$),
  ($txt$scatter-crossbow$txt$, $txt$crossbow$txt$)
) as weapon(set_id, pool)
join public.set_archetypes as pool
  on pool.set_id = weapon.pool
on conflict (set_id, archetype_id) do nothing;

insert into public.gear (name, slug, type, description, rarity, set_id)
values
  ($txt$Axe$txt$, $txt$axe$txt$, $txt$melee_weapon$txt$, $txt$An effective weapon, favored by the relentless Vindicators of the Illager army.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$axe$txt$),
  ($txt$Hunter's Hatchet$txt$, $txt$hunters-hatchet$txt$, $txt$melee_weapon$txt$, $txt$For the experienced hunter who knows how to fletch their own arrows.$txt$, array[$txt$unique$txt$]::text[], $txt$axe$txt$),
  ($txt$Battlestaff$txt$, $txt$battlestaff$txt$, $txt$melee_weapon$txt$, $txt$With extra weights on the ends for striking fear into your enemies.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$battlestaff$txt$),
  ($txt$Elemental Staff$txt$, $txt$elemental-staff$txt$, $txt$melee_weapon$txt$, $txt$A powerful staff that unleashes the elements of fire, ice, poison and electricity on your enemies.$txt$, array[$txt$unique$txt$]::text[], $txt$battlestaff$txt$),
  ($txt$Battle Hammer$txt$, $txt$battle-hammer$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$battle-hammer$txt$),
  ($txt$Emerald Hammer$txt$, $txt$emerald-hammer$txt$, $txt$melee_weapon$txt$, $txt$This steel hammer with emerald alloy is said to bring extraordinary luck to its wielder.$txt$, array[$txt$unique$txt$]::text[], $txt$battle-hammer$txt$),
  ($txt$Claymore$txt$, $txt$claymore$txt$, $txt$melee_weapon$txt$, $txt$A massive sword that rests easily in a righteous warrior's hands.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$claymore$txt$),
  ($txt$Slaymore$txt$, $txt$slaymore$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$claymore$txt$),
  ($txt$Clobberer$txt$, $txt$clobberer$txt$, $txt$melee_weapon$txt$, $txt$For those who prefer a less subtle approach to problem solving.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$clobberer$txt$),
  ($txt$Redstone Wrecker$txt$, $txt$redstone-wrecker$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$clobberer$txt$),
  ($txt$Cookiecutter$txt$, $txt$cookiecutter$txt$, $txt$melee_weapon$txt$, $txt$A curved greatsword that works all enemies into equal shape and size.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$cookiecutter$txt$),
  ($txt$Lullaby Blade$txt$, $txt$lullaby-blade$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$cookiecutter$txt$),
  ($txt$Double Daggers$txt$, $txt$double-daggers$txt$, $txt$melee_weapon$txt$, $txt$When one dagger just isn't fast enough.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$double-daggers$txt$),
  ($txt$Venomous Fangs$txt$, $txt$venomous-fangs$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$double-daggers$txt$),
  ($txt$Double Sickles$txt$, $txt$double-sickles$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$double-sickles$txt$),
  ($txt$Sift Sickles$txt$, $txt$sift-sickles$txt$, $txt$melee_weapon$txt$, $txt$A pair of humbler husk sickles with the power to both harm and heal.$txt$, array[$txt$unique$txt$]::text[], $txt$double-sickles$txt$),
  ($txt$Gauntlets$txt$, $txt$gauntlets$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$gauntlets$txt$),
  ($txt$Prime Enchanter's Gauntlets$txt$, $txt$prime-enchanters-gauntlets$txt$, $txt$melee_weapon$txt$, $txt$One is crackling with electricity. The other is enchanted with ice. Both are primed for punching.$txt$, array[$txt$unique$txt$]::text[], $txt$gauntlets$txt$),
  ($txt$Glaive$txt$, $txt$glaive$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$glaive$txt$),
  ($txt$Golden Glaive$txt$, $txt$golden-glaive$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$glaive$txt$),
  ($txt$Greataxe$txt$, $txt$greataxe$txt$, $txt$melee_weapon$txt$, $txt$A good axe settles for having one blade on one side. This is no goodaxe.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$greataxe$txt$),
  ($txt$Awesomeaxe$txt$, $txt$awesomeaxe$txt$, $txt$melee_weapon$txt$, $txt$Why would anyone ever settle for a greataxe?$txt$, array[$txt$unique$txt$]::text[], $txt$greataxe$txt$),
  ($txt$Greatsword$txt$, $txt$greatsword$txt$, $txt$melee_weapon$txt$, $txt$If your heart is just, even the greatest sword will feel as light as a feather.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$greatsword$txt$),
  ($txt$The Darkshard$txt$, $txt$the-darkshard$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$greatsword$txt$),
  ($txt$Longsword$txt$, $txt$longsword$txt$, $txt$melee_weapon$txt$, $txt$A mighty longsword with a razor-sharp edge.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$longsword$txt$),
  ($txt$Frostbiter$txt$, $txt$frostbiter$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$longsword$txt$),
  ($txt$Mace$txt$, $txt$mace$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$mace$txt$),
  ($txt$Carapace Mace$txt$, $txt$carapace-mace$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$mace$txt$),
  ($txt$Meat Cleaver$txt$, $txt$meat-cleaver$txt$, $txt$melee_weapon$txt$, $txt$A reliable kitchen cleaver repurposed for serving up justice.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$meat-cleaver$txt$),
  ($txt$Cacaphonous Cleaver$txt$, $txt$cacaphonous-cleaver$txt$, $txt$melee_weapon$txt$, $txt$A mystical meat cleaver that serves souls for dessert.$txt$, array[$txt$unique$txt$]::text[], $txt$meat-cleaver$txt$),
  ($txt$Mob Mallet$txt$, $txt$mob-mallet$txt$, $txt$melee_weapon$txt$, $txt$Let's play a good old game of whack-a-mob!$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$mob-mallet$txt$),
  ($txt$Monster Masher$txt$, $txt$monster-masher$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$mob-mallet$txt$),
  ($txt$Pickaxe$txt$, $txt$pickaxe$txt$, $txt$melee_weapon$txt$, $txt$The iconic tool for adventurers and heroes for as longs as anyone can remember.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$pickaxe$txt$),
  ($txt$The Prospector's Pick$txt$, $txt$the-prospectors-pick$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$pickaxe$txt$),
  ($txt$Pike$txt$, $txt$pike$txt$, $txt$melee_weapon$txt$, $txt$Enemies won't want to get the wrong end of the stick when they run into you.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$pike$txt$),
  ($txt$Stormcaller$txt$, $txt$stormcaller$txt$, $txt$melee_weapon$txt$, $txt$A magic lightning rod attached to a copper pike that can strike your enemies in more ways than one.$txt$, array[$txt$unique$txt$]::text[], $txt$pike$txt$),
  ($txt$Rapier$txt$, $txt$rapier$txt$, $txt$melee_weapon$txt$, $txt$A nimble and narrow blade that strikes with fierce ferocity$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$rapier$txt$),
  ($txt$The Thousand Cuts$txt$, $txt$the-thousand-cuts$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$rapier$txt$),
  ($txt$Riftslasher$txt$, $txt$riftslasher$txt$, $txt$melee_weapon$txt$, $txt$A curved longsword with an edge so sharp it could open rifts of its own... It doesn't, though.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$riftslasher$txt$),
  ($txt$Pride of the Plains$txt$, $txt$pride-of-the-plains$txt$, $txt$melee_weapon$txt$, $txt$A sharp copper sword forged as a gift to a noble protector of the plains.$txt$, array[$txt$unique$txt$]::text[], $txt$riftslasher$txt$),
  ($txt$Sabre$txt$, $txt$sabre$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$sabre$txt$),
  ($txt$Rascal's Razor$txt$, $txt$rascals-razor$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$sabre$txt$),
  ($txt$Scythe$txt$, $txt$scythe$txt$, $txt$melee_weapon$txt$, $txt$Fit only for toiling warriors, the scythe truly separates the wheat from the chaff.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$scythe$txt$),
  ($txt$Soul Reaper$txt$, $txt$soul-reaper$txt$, $txt$melee_weapon$txt$, $txt$A scythe with a shard of a soul block for a blade, that draws all souls towards you.$txt$, array[$txt$unique$txt$]::text[], $txt$scythe$txt$),
  ($txt$Short Spear$txt$, $txt$short-spear$txt$, $txt$melee_weapon$txt$, $txt$With the right wielder, even a short spear can reach across dimensions$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$short-spear$txt$),
  ($txt$Spectral Spear$txt$, $txt$spectral-spear$txt$, $txt$melee_weapon$txt$, $txt$A spear forged in ichor and possessed by souls that will burn all enemies you point at.$txt$, array[$txt$unique$txt$]::text[], $txt$short-spear$txt$),
  ($txt$Shovel$txt$, $txt$shovel$txt$, $txt$melee_weapon$txt$, $txt$When planning for revenge, you must dig two graves: one for your enemy. And one... for your other enemy.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$shovel$txt$),
  ($txt$Diamond Shovel$txt$, $txt$diamond-shovel$txt$, $txt$melee_weapon$txt$, $txt$A durable diamond shovel enchanted with the power to blast enemies away.$txt$, array[$txt$unique$txt$]::text[], $txt$shovel$txt$),
  ($txt$Sword$txt$, $txt$sword$txt$, $txt$melee_weapon$txt$, $txt$A classic sword used by heroes and survivors since the dawn of the Overworld.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$sword$txt$),
  ($txt$The Burning Blade$txt$, $txt$the-burning-blade$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$sword$txt$),
  ($txt$Tidal Sickle$txt$, $txt$tidal-sickle$txt$, $txt$melee_weapon$txt$, $txt$A harvest tool for the new dimension, perfect for reaping souls.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$tidal-sickle$txt$),
  ($txt$Lunar Sickle$txt$, $txt$lunar-sickle$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$tidal-sickle$txt$),
  ($txt$Twilight Dagger$txt$, $txt$twilight-dagger$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$twilight-dagger$txt$),
  ($txt$Sculker's Bane$txt$, $txt$sculkers-bane$txt$, $txt$melee_weapon$txt$, $txt$A deadly dagger with a soul-infused edge.$txt$, array[$txt$unique$txt$]::text[], $txt$twilight-dagger$txt$),
  ($txt$War Hammer$txt$, $txt$war-hammer$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$war-hammer$txt$),
  ($txt$Heartbreaker$txt$, $txt$heartbreaker$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$war-hammer$txt$),
  ($txt$Wolf Claws$txt$, $txt$wolf-claws$txt$, $txt$melee_weapon$txt$, $txt$A respectful offering from your wolf friends, for close combat beneath the full moon.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$wolf-claws$txt$),
  ($txt$Sculker Claws$txt$, $txt$sculker-claws$txt$, $txt$melee_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$wolf-claws$txt$),
  ($txt$Bow$txt$, $txt$bow$txt$, $txt$ranged_weapon$txt$, $txt$A hunter's best friend, repurposed for hunting Illagers and monsters.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$bow$txt$),
  ($txt$Ranger's Promise$txt$, $txt$rangers-promise$txt$, $txt$ranged_weapon$txt$, $txt$A ranger never breaks a promise. This bow never misses its mark.$txt$, array[$txt$unique$txt$]::text[], $txt$bow$txt$),
  ($txt$Greatbow$txt$, $txt$greatbow$txt$, $txt$ranged_weapon$txt$, $txt$A powerful bow that fires with such force your arrows pierce even the toughest of enemies.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$greatbow$txt$),
  ($txt$Humbler Heartstring$txt$, $txt$humbler-heartstring$txt$, $txt$ranged_weapon$txt$, $txt$This greatbow beats like the heart of a Humbler and pierces through the toughest husks.$txt$, array[$txt$unique$txt$]::text[], $txt$greatbow$txt$),
  ($txt$Longbow$txt$, $txt$longbow$txt$, $txt$ranged_weapon$txt$, $txt$$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$longbow$txt$),
  ($txt$Creaking's Reach$txt$, $txt$creakings-reach$txt$, $txt$ranged_weapon$txt$, $txt$Made from the branch of a Creaking. Hits with the strength of an entire forest.$txt$, array[$txt$unique$txt$]::text[], $txt$longbow$txt$),
  ($txt$Powerbow$txt$, $txt$powerbow$txt$, $txt$ranged_weapon$txt$, $txt$For the patient ranger who doesn't like to waste arrows.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$powerbow$txt$),
  ($txt$Paragon$txt$, $txt$paragon$txt$, $txt$ranged_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$powerbow$txt$),
  ($txt$Shortbow$txt$, $txt$shortbow$txt$, $txt$ranged_weapon$txt$, $txt$A shorter, weaker bow with a faster fire rate and quicker charge time.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$shortbow$txt$),
  ($txt$Shooting Star$txt$, $txt$shooting-star$txt$, $txt$ranged_weapon$txt$, $txt$When you wish upon this star, you will evade enemy projectiles and shoot back.$txt$, array[$txt$unique$txt$]::text[], $txt$shortbow$txt$),
  ($txt$Trickbow$txt$, $txt$trickbow$txt$, $txt$ranged_weapon$txt$, $txt$For the trick shooter who likes to roll, jump, and shoot ricocheting arrows.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$trickbow$txt$),
  ($txt$Phantom Wing$txt$, $txt$phantom-wing$txt$, $txt$ranged_weapon$txt$, $txt$Fly like a phantom and become your enemy's worst nightmare.$txt$, array[$txt$unique$txt$]::text[], $txt$trickbow$txt$),
  ($txt$Crossbow$txt$, $txt$crossbow$txt$, $txt$ranged_weapon$txt$, $txt$The ranged weapon of choice for the Pillager warriors.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$crossbow$txt$),
  ($txt$The Shackler$txt$, $txt$the-shackler$txt$, $txt$ranged_weapon$txt$, $txt$Shoot chains at enemies to pin them to the ground. Nobody escapes the Shackler!$txt$, array[$txt$unique$txt$]::text[], $txt$crossbow$txt$),
  ($txt$Dual Crossbows$txt$, $txt$dual-crossbows$txt$, $txt$ranged_weapon$txt$, $txt$When one crossbow just isn't enough.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$dual-crossbows$txt$),
  ($txt$Double Crossers$txt$, $txt$double-crossers$txt$, $txt$ranged_weapon$txt$, $txt$These enchanted crossbows power up when you roll, firing with extra force.$txt$, array[$txt$unique$txt$]::text[], $txt$dual-crossbows$txt$),
  ($txt$Heavy Crossbow$txt$, $txt$heavy-crossbow$txt$, $txt$ranged_weapon$txt$, $txt$A slow but deadly menace and a real threat from a distance.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$heavy-crossbow$txt$),
  ($txt$The Close Ranger$txt$, $txt$the-close-ranger$txt$, $txt$ranged_weapon$txt$, $txt$Judge your enemies up close and personal.$txt$, array[$txt$unique$txt$]::text[], $txt$heavy-crossbow$txt$),
  ($txt$Rapid Crossbow$txt$, $txt$rapid-crossbow$txt$, $txt$ranged_weapon$txt$, $txt$For the hair-trigger hunter who likes firing rapid bursts of arrows.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$rapid-crossbow$txt$),
  ($txt$The Cross Pollinator$txt$, $txt$the-cross-pollinator$txt$, $txt$ranged_weapon$txt$, $txt$Cross-pollinate mobs with sharpened twigs and see what grows from their remains.$txt$, array[$txt$unique$txt$]::text[], $txt$rapid-crossbow$txt$),
  ($txt$Scatter Crossbow$txt$, $txt$scatter-crossbow$txt$, $txt$ranged_weapon$txt$, $txt$The ultimate weapon for when you have enemies coming from every direction.$txt$, array[$txt$common$txt$, $txt$rare$txt$, $txt$special$txt$]::text[], $txt$scatter-crossbow$txt$),
  ($txt$Harp Crossbow$txt$, $txt$harp-crossbow$txt$, $txt$ranged_weapon$txt$, $txt$$txt$, array[$txt$unique$txt$]::text[], $txt$scatter-crossbow$txt$)
on conflict (slug) do update
set
  name = excluded.name,
  type = excluded.type,
  description = excluded.description,
  rarity = excluded.rarity,
  set_id = excluded.set_id;

comment on column public.gear.set_id is
  'Set this piece belongs to. Null when the set is not known yet. Weapon sync writes the base weapon slug. Armor, artifact, and talisman syncs do not write this column.';

-- Uniques that are not on the current weapon list and have no known base.
insert into public.sets (slug, name)
values
  ($txt$burning-blade$txt$, $txt$Burning Blade$txt$),
  ($txt$sift-socks$txt$, $txt$Sift Socks$txt$),
  ($txt$tornado-blade$txt$, $txt$Tornado Blade$txt$)
on conflict (slug) do nothing;

insert into public.set_archetypes (set_id, archetype_id)
select weapon.slug, pool.archetype_id
from (
  values
    ($txt$burning-blade$txt$),
    ($txt$sift-socks$txt$),
    ($txt$tornado-blade$txt$)
) as weapon(slug)
join public.set_archetypes as pool
  on pool.set_id = $txt$melee$txt$
on conflict (set_id, archetype_id) do nothing;

update public.gear
set set_id = slug
where slug in ($txt$burning-blade$txt$, $txt$sift-socks$txt$, $txt$tornado-blade$txt$)
  and type = $txt$melee_weapon$txt$;
