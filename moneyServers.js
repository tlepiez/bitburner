/* moneyServer.js */
import * as netmap from "/scripts/libscan.js";

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var maxlevel = ns.getHackingLevel();
	var minlevel = 1;
	var hostname;

	if (args.help) {
		ns.tprint("This script lists all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
	if (ns.args.length > 0) {
		minlevel = ns.args[0];
	}

	ns.tprint("* max required Hacking level: " + maxlevel);

	const servers = netmap.list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
	ns.tprint(" money/ server         |  Lvl  (%hack)  Diff | hack time  money");
	for (const server of servers) {

		const requiredLevel = ns.getServerRequiredHackingLevel(server);
		const hackChance = ns.hackAnalyzeChance(server);
		const chance = ns.formatPercent(hackChance, 2);
		const hackTime = ns.formatNumber((ns.getHackTime(server) / 1000), 2);
		const moneyNum = ns.hackAnalyze(server) * ns.getServerMoneyAvailable(server) / hackTime;
		/*		const money = numeral(moneyNum).format('($ 0.00 a)'); // money in M$
				const maxMoney = numeral(ns.getServerMoneyAvailable(server)).format('($ 0.00 a)'); // money in M$
		*/
		//ns.tprint(moneyNum);
		const money = ns.formatNumber(moneyNum, 2); // money in M$
		const maxMoney = ns.formatNumber(ns.getServerMoneyAvailable(server), 2); // money in M$
		const servInfo = ns.getServer(server);

		hostname = sprintf("%20s  | %4d (%7s) %4d | %s sec \t%s/thread/s %s", server, requiredLevel, chance, servInfo.hackDifficulty, hackTime, money, maxMoney);
		if (moneyNum > 0 || maxMoney > 0) {
			if (requiredLevel > maxlevel) {
				hostname = hostname + " **LOCKED**";
			}
			if (servInfo.backdoorInstalled == true) {
				hostname = hostname + " -Backdoor-";
			}

			ns.tprint(hostname);
		}
	}
	ns.tprint(servers.length + " open servers in the list.");
}