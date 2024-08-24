/* name: hackerServer.js
	  list already hacked servers (root access=yes)
   
*/

import * as netmap from "/scripts/libscan.js";

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var maxlevel = 0;
	var hostname;
	var hcount = 0;
	var i = 0;
	var servInfo;

	if (args.help) {
		ns.tprint("This script lists all hacked servers with hack target.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
	ns.tprint("--- hacker dashboard list servers with script, target and threads ---");
	ns.tprint("* max required Hacking level: " + maxlevel);
	const servers = netmap.list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);

	ns.tprint(" open server  (#ps) \t| used/max RAM (%)\t|[target] #Thrds | script");
	for (const server of servers) {
		servInfo = ns.getServer(server);
		const used = servInfo.ramUsed;
		const max = servInfo.maxRam;
		const pctRam = (used / max);
		const processes = ns.ps(server);
		const pscount = processes.length;
		hostname = sprintf("%20s", server);
		if (max > 0) { // only hackable servers with ram> 0
			for (i = 0; i < processes.length; ++i) {
				const income = ns.getTotalScriptIncome(processes[i].filename, server, processes[i].args);
				if (i == 0) {
					ns.tprint(`${hostname} (${pscount})\t| ${used}/${max}GB (${(ns.formatPercent(pctRam, 2))})\t| [${processes[i].args}] #${processes[i].threads}  \t| ${processes[i].filename}`);
				} else {
					ns.tprint(`|                   \t|                       |[${processes[i].args}] #${processes[i].threads}\t| ${processes[i].filename}`);
				}
			}
			if (processes.length == 0) {
				ns.tprint(`${hostname} (${pscount})\t| ${used}/${max}GB (${(ns.formatPercent(pctRam, 2))})`);
			}
			hcount++;
		}
	}
	ns.tprint(hcount + " hackers servers in the list.");
}