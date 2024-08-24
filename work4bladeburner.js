/** @param {NS} ns */
import * as netmap from "/scripts/libscan.js";
export async function main(ns) {

	var sleeptime = 10000;
	var [current, max] = ns.bladeburner.getStamina();
	var ratio = current / max;
	if ((ns.getPlayer().hp.current < 5) || (ratio < 0.5)) {
		ns.print(netmap.getTimestamp() + ". current hp:" + ns.getPlayer().hp.current + "<5  or " + ratio + " <0.5");
		ns.bladeburner.stopBladeburnerAction();
		ns.bladeburner.startAction("general", "Hyperbolic Regeneration Chamber");
		while ((ns.getPlayer().hp.current < ns.getPlayer().hp.max) || (current < max)) {
			[current, max] = ns.bladeburner.getStamina();
			ns.print(". current hp:" + ns.getPlayer().hp.current + "... stamina:" + current / max);
			await ns.sleep(sleeptime / 3);
		}
		ns.bladeburner.stopBladeburnerAction();
		ns.bladeburner.startAction("general", "Field Analysis");
	}

	// list contracts
	for (const contractname of ns.bladeburner.getContractNames()) {
		ns.tprint("Contract:\t" + contractname
			+ "\tsuccess chance:\t" + ns.bladeburner.getActionEstimatedSuccessChance("contract", contractname));
	}
	// list operations
	for (const opname of ns.bladeburner.getOperationNames()) {
		ns.tprint("Op:\t" + opname
			+ "\tsuccess chance:\t" + ns.bladeburner.getActionEstimatedSuccessChance("operation", opname));
		;
	}

	// list Black ops
	for (const opname of ns.bladeburner.getBlackOpNames()) {
		ns.tprint("BlackOp:\t" + opname + "\trequired rank:\t" + ns.bladeburner.getBlackOpRank(opname)
			+ "\tsuccess chance:\t" + ns.bladeburner.getActionEstimatedSuccessChance("blackop", opname));
	}

	// list skills
	for (const skillname of ns.bladeburner.getSkillNames()) {
		ns.tprint("Skill:\t" + skillname + "\tLevel:\t" + ns.bladeburner.getSkillLevel(skillname)
			+ "\tupgrade cost:\t" + ns.bladeburner.getSkillUpgradeCost(skillname));
	}
	ns.tprint("skill points:\t" + ns.bladeburner.getSkillPoints());
	ns.bladeburner.startAction("general", "field analysis");
}