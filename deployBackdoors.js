/** @param { NS } ns */
// connect to any server and inst	ll backdoor

import * as netmap from "/scripts/libscan.js";

export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var player = ns.getPlayer();
	var areAllBackdoorsInstalled = false;
	var n = 1;

	if (args.help) {
		ns.tprint("This script helps you deploy backdoor to any server on the network.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} `);
		return;
	}
	ns.tail();
	ns.print(" starting...");
	const servers = netmap.list_servers(ns);
	while (areAllBackdoorsInstalled == false) {
		ns.print("loop #" + n);
		areAllBackdoorsInstalled = true; // start by considering we can hack them all
		for (const server of servers) {
			ns.print(`${netmap.getTimestamp()} host found : ${server} . `);
			if (ns.singularity.connect(server) == false) {
				ns.print("cannot connect to " + server);
			}
			const servInfo = ns.getServer(server);
			if (servInfo.purchasedByPlayer == false) {
				if (servInfo.hasAdminRights == true) {
					if (servInfo.backdoorInstalled == false) {
						areAllBackdoorsInstalled = false;
						ns.print("server : " + server + " backdoor is not installed");
						if (ns.getServerRequiredHackingLevel(server) < ns.getHackingLevel()) {
							if (ns.isRunning("scripts/installBackdoor.js", "home", server) == false) {
								ns.tprint("deploy backdoor on " + server + "(level:" + ns.getServerRequiredHackingLevel(server) + ")");
								ns.exec("scripts/installBackdoor.js", "home", 1, server);

							}
						} else {
							ns.print("required level " + ns.getServerRequiredHackingLevel(server) + " higher than mine");

						}
					} else {
						ns.print(" backdoor is already installed");
					}
				}
			}
		}
		await ns.sleep(5000);
		n++;
	}
	ns.print("...done!");
}
export function autocomplete(data, args) {
	return data.servers;
}