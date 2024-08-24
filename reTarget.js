/** @param {NS} ns **/
/* reTarget.js
	param1: target to replace
	param2:  new target 
*/
import * as netmap from "/scripts/libscan.js";

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var newTarget;
	var oldTarget;
	var hostname;
	var maxlevel = ns.getHackingLevel();
	var script = ns.getScriptName();

	if ((ns.args.help) || (ns.args.length < 2)) {
		ns.tprint("This script replace hack target where servers are hacking old target.");
		ns.tprint(`Usage: run ${script} {currentTarget} {newTarget`);
		ns.tprint("Example:");
		ns.tprint(`> run ${script} joesguns zer0`);
		return;
	}
	if (ns.args.length > 0) {
		oldTarget = ns.args[0];
		newTarget = ns.args[1];
	}
	const money = ns.nFormat(ns.getServerMoneyAvailable(newTarget), "($ 0.00 a)"); // money in M$
	const maxMoney = ns.nFormat(ns.getServerMaxMoney(newTarget), "($ 0.00 a)");
	const requiredLevel = ns.getServerRequiredHackingLevel(newTarget);
	const hackChance = ns.hackAnalyzeChance(newTarget);

	ns.tprint("* current Hacking level: " + maxlevel);
	ns.tprint("search for target " + oldTarget);
	ns.tprint(`replace by target ${newTarget} security: ${requiredLevel} (${(ns.nFormat(hackChance, "0.00 %"))})\t. ${money}/${maxMoney}`);
	ns.tail();
	const servers = netmap.list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
	for (const server of servers) {
		const max = ns.getServerMaxRam(server);
		const processes = ns.ps(server);
		const pscount = processes.length;
		hostname = sprintf("%20s", server);
		ns.tprint(`${hostname} \t. ${pscount} \t. ${max}GB `)
		for (var i = 0; i < processes.length; ++i) {
			if (processes[i].args == oldTarget) {
				ns.tprint(`redeploy ${hostname} . hack target: ${newTarget}`)
				ns.exec("/scripts/redeploy.js", "home", 1, server, "/scripts/basic-hack.js", newTarget);
				await ns.sleep(1000);
			}
		}
	}
	ns.tprint(servers.length + " open servers in the list.");
}