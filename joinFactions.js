/** @param {NS} ns */
export async function main(ns) {
/*
checkFactionInvitations(): string[];
getFactionRep(faction: string): number;  // reputation dansla faction
getAugmentationsFromFaction(faction: string): string[]; // available augment in faction
purchaseAugmentation(faction: string, augmentation: string): boolean;
getAugmentationPrice(augName: string): number; // prix  à pzyer 
getAugmentationRepReq(augName: string): number; // reputation requise
*/
var invitations =ns.singularity.checkFactionInvitations();

for (let faction of invitations) {
	if (ns.singularity.joinFaction(faction)) {
		ns.tprint("joined "+faction);
		if (ns.singularity.getAugmentationsFromFaction(faction).length > 0)
				ns.singularity.workForFaction(faction, "hacking", false);

	}

}
var 

}