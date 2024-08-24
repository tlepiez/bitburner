/** @param {NS} ns **/
/** @param {NS} ns **/
/* Script name: deploy.js
   deploy a script on a server with maximum threads with available RAM
   use cases :
	new server , use max RAM for the script
	running server, use remaining RAM if any 
   - this script do not kill process before launching threads
   - use redeploy.js to kill all running process before launching new threads
*/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help || args._.length < 2) {
		ns.tprint("This script deploys another script on a server with maximum threads possible.");
		ns.tprint(`Usage: run ${ns.getScriptName()} HOST SCRIPT ARGUMENTS`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles basic_hack.js foodnstuff`);
		return;
	}

	const host = args._[0];
	const script = args._[1];
	const script_args = args._.slice(2);
	const scriptRam = ns.getScriptRam(script);
	if (!ns.serverExists(host)) {
		ns.tprint(`Server '${host}' does not exist. Aborting.`);
		return;
	}
	if (!ns.ls(ns.getHostname()).find(f => f === script)) {
		ns.tprint(`Script '${script}' does not exist. Aborting.`);
		return;
	}
	const availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
	if (availableRam <= 0) {
		ns.tprint(`no RAM available on Server '${host}' . Aborting.`);
		return;
	}
	if (availableRam > scriptRam) {
		const threads = Math.floor(availableRam / scriptRam);
		if (threads > 0) {
			ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
			await ns.scp(script, host, ns.getHostname());
			ns.exec(script, host, threads, ...script_args);
		} else {
			ns.tprint(` script ${script} requires ${scriptRam}GB`);
			ns.tprint(` not enough RAM (${availableRam}GB) to launch script`);
		}
	} else {
		ns.tprint(`Not enough RAM available on server '${host}' only ${(ns.nFormat(availableRam, "0.0"))}GB for ${scriptRam}GB req'd`);
	}
}