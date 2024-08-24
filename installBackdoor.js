/** @param {NS} ns */
function recursiveScan(ns, parent, server, target, route) {
	const children = ns.scan(server);
	for (let child of children) {
		if (parent == child) {
			continue;
		}
		if (child == target) {
			route.unshift(child);
			route.unshift(server);
			return true;
		}

		if (recursiveScan(ns, server, child, target, route)) {
			route.unshift(server);
			return true;
		}
	}
	return false;
}
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	let route = [];
	let server = args._[0];
	if (!server || args.help) {
		ns.tprint("This script try to install backdoor all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}

	ns.tprint("install backdoor on " + server + "...");
	recursiveScan(ns, '', 'home', server, route);
	for (const i in route) {

		// install backdoor : checks
		ns.singularity.connect(route[i]);
		var info = ". \t\t\tROOT access:";
		const servInfo = ns.getServer(route[i]);
		if (servInfo.isConnectedTo == true) {
			if (servInfo.hasAdminRights == true) {
				if (servInfo.backdoorInstalled == false) {
					// backdoor is. not installed
					if (servInfo.purchasedByPlayer == false) {
						const requiredLevel = ns.getServerRequiredHackingLevel(route[i]);
						if (requiredLevel < ns.getHackingLevel()) {
							if (await ns.singularity.installBackdoor() == true) {
								ns.tprint(" +Backdoor installed on " + route[i]);
							}
						}
					}
				}
			}
		}
		// print arbo
		const extra = i > 0 ? "└ (" + i + ")" : "";
		ns.print(`${" ".repeat(i)}${extra}${route[i]}`);
	}
}
export function autocomplete(data, args) {
	return data.servers;
}