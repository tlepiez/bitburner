/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const hostname = args._[0];
	if (args.help || !hostname) {
		ns.tprint("This script will generate money by hacking a target server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}
	try {
		if (ns.deleteServer(hostname)) {
			ns.tprint("server " + hostname + " deleted");
		} else {
			ns.tprint("server " + hostname + " NOT deleted");
		};

	} catch {
		ns.tprint("probleme delete server " + hostname);
	}
}