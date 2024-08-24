/** @param {NS} ns */
export async function main(ns) {
	/*
	infinite loop to upgrade home server
	* RAM
	* cores
	*/
	var currentMoney = ns.getServerMoneyAvailable("home");
	var sleeptime = 600000; // 10 minutes

	const args = ns.flags([["help", false]]);

	if (args.help) {
		ns.tprint("This script upgrade home server .");
		ns.tprint("USAGE: run ${ns.getScriptName()} [sleeptime] ");
		ns.tprint("Examples: (sleeptime default to ${sleeptime} ms)");
		ns.tprint("> run ${ns.getScriptName()} 60000 ");
		exit(1);
	}
	switch (ns.args.length) {
		case 1: sleeptime = ns.args[0];
	}
	ns.tail();
	ns.print("sleep time:" + sleeptime);
	while (true) {
		currentMoney = ns.getServerMoneyAvailable("home");
		// try upgrade Cores
		if (ns.singularity.getUpgradeHomeCoresCost() < currentMoney) {
			if (ns.singularity.upgradeHomeCores() == true) {
				ns.print("- home Cores upgraded");
				currentMoney = ns.getServerMoneyAvailable("home");
				ns.print("current Money after cores upgrade:" + currentMoney);
			}
		}
		// try upgrade RAM
		if (ns.singularity.getUpgradeHomeRamCost() < currentMoney) {
			if (ns.singularity.upgradeHomeRam() == true) {
				ns.print("- home RAM upgraded");
				currentMoney = ns.getServerMoneyAvailable("home");
				ns.print("current Money after RAM upgrade:" + currentMoney);
			}
		}
		ns.print("cost of next cores upgrade:" + ns.singularity.getUpgradeHomeCoresCost());
		ns.print("cost of next RAM upgrade:" + ns.singularity.getUpgradeHomeRamCost());
		await ns.sleep(sleeptime); //wait for money
	}
}