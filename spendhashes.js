/** @param {NS} ns */
export async function main(ns) {
	/*
	while max power of each hacknet node is not reached
	 -- while hashes > 4000
		-- buy money to upgrade hacknet 
	
	*/
	var maxPower = false;

	var currentMoney = ns.getServerMoneyAvailable("home");
	var sleeptime = 10000; // 10 secondes
	var upgradeName = "Sell for Money";
	var upgradeCost = 0;

	const args = ns.flags([["help", false]]);

	if (args.help) {
		ns.tprint("This script spends hashes for money.");
		ns.tprint("USAGE: run ${ns.getScriptName()} [sleeptime for money] ");
		ns.tprint("Examples: (default is 10000 = 10 seconds )");
		ns.tprint("> run ${ns.getScriptName()} 10000 ");
		exit(1);
	}
	switch (ns.args.length) {
		case 1: sleeptime = ns.args[0];
	}
	ns.tail();
	ns.print("sleep time:" + sleeptime);
	while (maxPower == false) {
		ns.print("current Money before selling hashes:" + currentMoney);
		ns.print("hashes to sell:" + ns.hacknet.numHashes());
		// purchase money
		upgradeCost = ns.hacknet.hashCost(upgradeName);
		while (ns.hacknet.numHashes() > upgradeCost) {
			ns.print("-$$$$------- sell hashes for Money");
			ns.hacknet.spendHashes(upgradeName);
			currentMoney = ns.getServerMoneyAvailable("home");
		}
		await ns.sleep(sleeptime); //wait for hacknet to produce money
	}
}