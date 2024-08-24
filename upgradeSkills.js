/** @param {NS} ns */
import * as netmap from "/scripts/libscan.js";
export async function main(ns) {
	/*
	spend skillpoints automatically to upgrade bladeburner
	
	*/
	var req = 0;
	var skpts = 0;
	var sleeptime = 10000;
	const args = ns.flags([["help", false]]);

	if (args.help) {
		ns.tprint("This script upgrades Bladeburner skills automatically.");
		ns.tprint("USAGE: run ${ns.getScriptName()} [sleeptime between each loop] ");
		ns.tprint("Examples: (default is 10000 = 10 seconds )");
		ns.tprint("> run ${ns.getScriptName()} 10000 ");
		exit(1);
	}
	switch (ns.args.length) {
		case 1: sleeptime = ns.args[0];
	}
	ns.tail();
	ns.print("sleep time:" + sleeptime);

	while (true == true) {
		skpts = ns.bladeburner.getSkillPoints();
		ns.print(netmap.getTimestamp() + " skill points:\t" + skpts);
		ns.print("skill (Level): upgrade cost");
		ns.print("---------------------------------------------");
		// list skills
		for (const skillname of ns.bladeburner.getSkillNames()) {
			req = ns.bladeburner.getSkillUpgradeCost(skillname);
			ns.print(skillname + "(" + ns.bladeburner.getSkillLevel(skillname)
				+ "): " + ns.bladeburner.getSkillUpgradeCost(skillname));
			if (skpts >= req) {
				if (ns.bladeburner.upgradeSkill(skillname) == true) {
					skpts = ns.bladeburner.getSkillPoints();
					ns.print(". successfull upgrade");
				}
			}
			var [current, max] = ns.bladeburner.getStamina();
			var ratio = current / max;
			if ((ns.getPlayer().hp.current < 5) || (ratio < 0.5)) {
				ns.print(". current hp:" + ns.getPlayer().hp.current + "<5  or " + ratio + " <0.5");
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
		}
		await ns.sleep(sleeptime); //wait for hacknet to produce money
	}
}