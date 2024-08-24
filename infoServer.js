/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var server = ns.getHostname(); // current host
	var script = "/scripts/basic-hack.js";
	var threads = 0;
	if (args.help) {
		ns.tprint("This script try to install backdoor all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
	if (ns.args.length > 0) {
		server = ns.args[0];
	}	// server info

	const currentMoney = ns.getServerMoneyAvailable(server);
	const hackMoney = ns.hackAnalyze(server) * currentMoney;
	const availableRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
	const hackTime = ns.nFormat((ns.getHackTime(server) / 1000), "0.00");
	const moneyNum = ns.hackAnalyze(server) * ns.getServerMoneyAvailable(server) / hackTime;
	const servInfo = ns.getServer(server);
	ns.tprint("--------------------------------------------------");
	ns.tprint("Host: " + servInfo.hostname);
	ns.tprint("organization Name  :" + servInfo.organizationName);
	ns.tprint(".      Root Access.           : " + servInfo.hasAdminRights);
	ns.tprint(".      Backdoor installed.    : " + servInfo.backdoorInstalled);
	ns.tprint(".      Cur. / Max. Money      : " + ns.nFormat(currentMoney, "($ 0.00 a)")
		+ " / " + ns.nFormat(servInfo.moneyMax, "($ 0.00 a)"));
	ns.tprint("       ---------------------- ");
	ns.tprint(".      Hack difficulty.       : " + servInfo.hackDifficulty);
	ns.tprint(".      Required Hacking skills: " + servInfo.requiredHackingSkill);
	ns.tprint(".      Hack. analz. chance    : " + ns.nFormat(ns.hackAnalyzeChance(server), "0.00 %"));
	ns.tprint(".      Hack. time             : " + ns.nFormat((ns.getHackTime(server) / 1000), "0.00") + " sec");
	ns.tprint(".      Hack. money/thread     : " + ns.nFormat(hackMoney, "($ 0.000 a)"));
	ns.tprint(".      Hack. money/thread/s.  : " + ns.nFormat(moneyNum, "($ 0.00 a)"));
	ns.tprint(".      Hack. analz. secur./thr: " + ns.hackAnalyzeSecurity(1));
	ns.tprint(".      Min./Cur./Base Security: " + servInfo.minDifficulty
		+ " / " + ns.nFormat(servInfo.hackDifficulty, "0.000")
		+ " / " + servInfo.baseDifficulty);
	ns.tprint(".      Growth Level.          : " + servInfo.serverGrowth);
	ns.tprint(".      Number of open ports required to NUKE: " + servInfo.numOpenPortsRequired)
	ns.tprint(".      Number of open ports   : " + servInfo.openPortCount);
	if (servInfo.sshPortOpen == false) {
		ns.tprint(".       ssh  Port             : Close");
	}
	if (servInfo.smtpPortOpen == false) {
		ns.tprint(".       smtp Port             : Close");
	}
	if (servInfo.ftpPortOpen == false) {
		ns.tprint(".       ftp  Port             : Close");
	}
	if (servInfo.httpPortOpen == false) {
		ns.tprint(".       http Port             : Close");
	}
	if (servInfo.sqlPortOpen == false) {
		ns.tprint(".       sql  Port             : Close");
	}
	ns.tprint("       ---------------------- ");
	ns.tprint(".      is Connected To        : " + servInfo.isConnectedTo);
	ns.tprint(".      servers On Network.    : " + servInfo.serverOnNetwork);
	ns.tprint("       ---------------------- ");
	ns.tprint(".      Cpu Cores              : " + servInfo.cpuCores);
	ns.tprint(".      Max. RAM               : " + servInfo.maxRam + "GB");
	if (servInfo.maxRam > 0) {
		threads = Math.floor((ns.getServerMaxRam(server)) / ns.getScriptRam(script));
	}
	ns.tprint(".      Max. Thread            : " + threads + " threads of " + script);
	ns.tprint(".      Used RAM               : " + servInfo.ramUsed + "GB");
	ns.tprint(".      Avail. RAM             : " + ns.nFormat(availableRam, "0.0") + "GB");
	if (availableRam > 0) {
		threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(script));
	}
	ns.tprint(".      Avail. Thread          : " + threads + " threads of " + script);
	ns.tprint(". Purchased By Player: " + servInfo.purchasedByPlayer);

	ns.tprint(" ---------------------------------- ");
	/*
	ns.tprint ("messages       :"+servInfo.messages);
	ns.tprint ("programs       :"+servInfo.programs);
	ns.tprint ("runningScripts :"+servInfo.runningScripts);
	ns.tprint ("scripts        :"+servInfo.scripts);
	ns.tprint ("contracts      :"+servInfo.contracts);
	ns.tprint ("textFiles      :"+servInfo.textFiles);
	*/
	ns.tprint("-----  running processes -------------------------");
	var processes = ns.ps(server);
	var i = 0;
	for (i = 0; i < processes.length; ++i) {
		ns.tprint(processes[i].pid
			+ " | " + processes[i].filename
			+ " [" + processes[i].args + "] "
			+ "\t " + processes[i].threads
			+ " threads\t" + ns.getScriptRam(processes[i].filename)
			+ " GB");

	}
	ns.tprint("--------------------------------------------------");
	ns.tprint(".  ip: " + servInfo.ip);
}