/** @param {NS} ns **/
/*
list_server : 
*/
var maxlevel = 999;
var n = 0;

function recursiveScan(ns, parent, server, route, level) {
	if (level > maxlevel) {
		return false
	}
	n = n + 1;
	const children = ns.scan(server);
	const extra = level > 0 ? "└ (" + level + ")" : "";
	const servInfo = ns.getServer(server);
	const requiredLevel = ns.getServerRequiredHackingLevel(server);
	if (maxlevel >= requiredLevel) {
		var info = ". \t\t\t";
		if (servInfo.hasAdminRights == true) {
			info = info + "ROOT access";
			if (servInfo.backdoorInstalled == true) {
				info = info + " + Backdoor";
			}
			if (ns.ls(server).find(f => f.endsWith(".cct"))) {
				info = info + " + contrat";
			}
		} else {
			info = info + " NO";
		}
		info = info + "\t(lvl:" + requiredLevel + ")";
		ns.tprint(`${" ".repeat(level)}${extra}${server}${info}`);
	}
	level = level + 1;
	for (let child of children) {
		if (parent == child) {
			continue;
		}
		if (recursiveScan(ns, server, child, route, level)) {
			route.unshift(server);
			return true;
		}
	}
	return false;
}

export async function main(ns) {
	const args = ns.flags([["help", false]]);

	if (args.help) {
		ns.tprint("This script lists all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
	if (ns.args.length > 0) {
		maxlevel = ns.args[0];
	} else {
		maxlevel = 9999;
	}
	let route = [];
	let level = 0;
	recursiveScan(ns, '', 'home', route, level);
	//ns.tprint('Route[]=' + route);
	ns.tprint(n + ' servers.');
}

export function autocomplete(data, args) {
	return data.servers;
}