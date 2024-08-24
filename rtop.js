/** @param {NS} ns **/
// remote top (list processes)
export async function main(ns) {
	var server = ns.getHostname(); // current host
	const args = ns.flags([["help", false]]);
	if ((args.help) || (ns.args.length < 1)) {
		ns.tprint("This script lists all processes on the specified server.");
		ns.tprint(`Usage: run ${ns.getScriptName()} {serverName}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} joesguns `);
		return;
	}
	if (ns.args.length > 0) {
		server = ns.args[0];
	}

	ns.tprint("Host: " + server + " -----  running processes -------------------------");
	ns.tprint("Script                                  PID   Threads         RAM Usage");
	var processes = ns.ps(server);
	var i = 0;
	for (i = 0; i < processes.length; ++i) {
		const scriptname = sprintf("%25s[%12s]", processes[i].filename, processes[i].args);
		const scriptRam = ns.getScriptRam(processes[i].filename, server) * processes[i].threads;
		ns.tprint(scriptname + " " + processes[i].pid + "\t" + processes[i].threads + "\t\t" + scriptRam + "GB");
	}
}