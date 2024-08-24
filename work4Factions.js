/** @param {NS} ns **/
/* 

respawn work for factions we have joined
-- requires Singularity (source node 4)
*/
const hacktime = 180000; // wait work for 3mn
const fieldtime = 60000; // wait(work) for 1 mn

function getTimestamp() {
	const event = new Date();
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

	return event.toLocaleDateString('fr-fr', options) + " " + event.toLocaleTimeString('fr-fr') + " - ";
}

export async function main(ns) {
	var player = ns.getPlayer();
	//var factions; // array of function
	var hackContract = true;
	var fieldContract = true;
	var alldone = false;
	var augmentationsFaction;
	var augmentationsOwned;
	var invitations;
	var n = 0;
	var i = 0;
	var work = null;
	var waitTime = hacktime;
	const args = ns.flags([["help", false], ["hack", false], ["field", false]]);
	if (args.help) {
		ns.tprint("This script manages work in Faction.");
		ns.tprint("by default hacking and field contracts, ");
		ns.tprint("use --hack to focus on hacking. ");
		ns.tprint("use --field to focus on field. ");
		ns.tprint(`Usage: run ${ns.getScriptName()} [{--hack | --field}]`);
		ns.tprint("Example to focus on hack:");
		ns.tprint(`> run ${ns.getScriptName()} --hack `);
		return;
	}

	if (args.hack) {
		ns.tprint(" no field contracts, focus on hacking");
		hackContract = true;
		fieldContract = false;
	}
	if (args.field) {
		ns.tprint(" no hacking contracts, focus on field");
		hackContract = false;
		fieldContract = true;
	}
	while (alldone == false) {
		//refresh info
		waitTime=10000; // 10 sec
		player = ns.getPlayer();
		invitations = ns.singularity.checkFactionInvitations();
		if (invitations.length > 0) {
			for (let faction of invitations) {
				if (ns.singularity.joinFaction(faction)) {
					ns.print(getTimestamp() + ". joined " + faction);
				}
				await ns.sleep(1000);
			}
		}

		if (ns.singularity.getCurrentWork() != null)
			work = Object.values(ns.singularity.getCurrentWork());
		//work object: 
		//COMPANY, gain, location
		// COMPANY | 671 | FoodNStuff
		// COMPANY | 97  | Joe's Guns
		//
		// FACTION, gain, worktype, faction name
		// FACTION | 26 | FIELD   | Tetrads
		// FACTION | 33 | HACKING | Tian Di Hui
		// FACTION | 32 | FIELD   | Chongqing
		ns.print("current work:\t" + work);
		for (const faction of player.factions) {
			ns.print(getTimestamp() + "." + faction);
			ns.print("\t favor.    : " + ns.singularity.getFactionFavor(faction));
			ns.print("\t reputation: " + ns.singularity.getFactionRep(faction));

			augmentationsOwned = ns.singularity.getOwnedAugmentations(true);
			augmentationsFaction = ns.singularity.getAugmentationsFromFaction(faction);
			n = augmentationsFaction.length;

			for (let owned of augmentationsOwned) {
				i = 0;
				for (let available of augmentationsFaction) {
					if (owned == available) {
						n = n - 1;
						augmentationsFaction[i] = "";
					}
					i = i + 1;
				}
			}
			ns.print(n + " remaining augmentations: " + augmentationsFaction);
			waitTime=0;
			if (n > 0) {
				if (hackContract == true) {
					waitTime = hacktime;
					if (ns.singularity.workForFaction(faction, "hacking", false) == false) {
						// no hacking contract, use field contract if not focussing on hacking
						waitTime = 0;
						if (fieldContract == true) {
							waitTime = fieldtime;
							if (ns.singularity.workForFaction(faction, "field", false) == false) {
								waitTime = 0;
							}
						}
					}
				}
			} else {
				if (fieldContract == true) {
					waitTime = fieldtime;
					if (ns.singularity.workForFaction(faction, "field", false) == false) {
						// no field contract, use hack contract if not focusing on field
						waitTime = 0;
						if (hackContract == true) {
							waitTime = hacktime;
							if (ns.singularity.workForFaction(faction, "hacking", false) == false) {
								waitTime = 0;
							}
						}
					}
				}
			}
			if (waitTime > 0)
				//This way, your faction reputation will be updated every waittime.
				await ns.sleep(waitTime);
		}
		await ns.sleep(10000); // 10sec
	}
}
