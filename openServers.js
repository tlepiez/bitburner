/** @param {NS} ns **/
/* openServer.js */
import * as netmap from "/scripts/libscan.js";

/** @param {NS} ns **/
export async function main(ns) {
	var maxlevel = ns.getHackingLevel();
	var minlevel = 1;
	var hostname;
	const args = ns.flags([["help", false]]);

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
	ns.tprint(" open server         | ps  used/max RAM (%use)  | Lvl  (%hack)  Diff | Avail./Max. money");
	for (const server of servers) {
		const used = ns.getServerUsedRam(server);
		const max = ns.getServerMaxRam(server);
		const pctRam = ns.nFormat((used / max), "0.0%");
		const requiredLevel = ns.getServerRequiredHackingLevel(server);
		const hackChance = ns.hackAnalyzeChance(server);
		const chance = ns.nFormat(hackChance, "0.0%");
		const moneyNum = ns.getServerMoneyAvailable(server);
		const money = ns.nFormat(ns.getServerMoneyAvailable(server), "($ 0.00 a)"); // money in M$
		const maxMoney = ns.nFormat(ns.getServerMaxMoney(server), "($ 0.00 a)"); // money in M$
		const servInfo = ns.getServer(server);

		const processes = ns.ps(server);
		const pscount = processes.length;
		hostname = sprintf("%20s . %3d %3d/%3d GB (%7s) . %4d (%7s) %4d. %s/%s", server, pscount, used, max, pctRam, requiredLevel, chance, servInfo.hackDifficulty, money, maxMoney);
		if (moneyNum > 0) {
			if (requiredLevel > maxlevel) {
				hostname = hostname + " **LOCK**";
			}
			if (servInfo.backdoorInstalled == true) {
				hostname = hostname + "-Backdoor-";
			}
			ns.tprint(hostname);
		}
	}
	ns.tprint(servers.length + " open servers in the list.");
}