/** @param {NS} ns **/
/* already hacked servers 
   hackedServer.js
   */
import * as netmap from "/scripts/libscan.js";

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var maxlevel = 0;
	var minlevel = 1;
	var minmoney = 0;
	var hostname;
	var hcount = 0;

	if (args.help) {
		ns.tprint("This script lists all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
	if (ns.args.length > 0) {
		minlevel = ns.args[0];
		maxlevel = ns.getHackingLevel();
	} else {
		maxlevel = 9999;
	}
	ns.tprint("List all hacked servers on which you can run scripts.");
	const servers = netmap.list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);

	ns.tprint(" open server \t| ps  \tRAM used/max (%use)\t| Sec. lvl (%chance) diff.");
	for (const server of servers) {
		const used = ns.getServerUsedRam(server);
		const max = ns.getServerMaxRam(server);
		const requiredLevel = ns.getServerRequiredHackingLevel(server);
		const hackChance = ns.hackAnalyzeChance(server);
		//const maxMoney = ns.nFormat(ns.getServerMaxMoney(server), "($ 0.00 a)");
		//const money = ns.nFormat(ns.getServerMoneyAvailable(server), "($ 0.00 a)"); // money in M$
		const processes = ns.ps(server);
		const pscount = processes.length;
		const servInfo = ns.getServer(server);
		hostname = sprintf("%20s", server);
		if (max > 0) { // RAM is required to run script
			if (maxlevel > requiredLevel) { // only servers with req level
				var info = hostname
					+ "\t| " + pscount + " \t" + used + "/" + max + " GB (" + (100 * used / max).toFixed(2)
					+ ")\t| " + requiredLevel + " (" + (ns.formatPercent(hackChance, 2))
					+ ")\t| " + servInfo.hackDifficulty;
				if (servInfo.backdoorInstalled == true) {
					info = info + " + Backdoor";
				}
				ns.tprint(info);
				//ns.tprint(`${hostname}\t. ${pscount} \t${used}/${max} GB (${(100 * used / max).toFixed(2)}%)\t. ${requiredLevel} (${(ns.nFormat(hackChance, "0.00 %"))}) ${servInfo.hackDifficulty.toFixed(1)}`);
				hcount++;
			}
		}
	}
	ns.tprint(hcount + " hacked servers in the list.");
}