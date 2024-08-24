/** @param {NS} ns **/
export async function main(ns) {
	// Initial Process loading : launch it at reboot
	// script can be relaunched several times
	// it search for new servers without root access
	// and add to thelist of hacks
	var target = "joesguns";
	ns.nuke(target);
	// launch separate process
	// complete recursive scan of the network
	ns.exec("/scripts/discover-network.js", "home", 1, target);
	// collect all files from servers found and copy back to home server (infinite loop)
	//ns.exec("/scripts/filesCollector.js", "home");
	// purchase tor
	ns.singularity.purchaseTor();
	/*
	BruteSSH.exe - [OWNED] - Opens up SSH Ports.
	FTPCrack.exe - [OWNED] - Opens up FTP Ports.
	relaySMTP.exe - [OWNED] - Opens up SMTP Ports.
	HTTPWorm.exe - [OWNED] - Opens up HTTP Ports.
	SQLInject.exe - [OWNED] - Opens up SQL Ports.
	ServerProfiler.exe - [OWNED] - Displays detailed information about a server.
	DeepscanV1.exe - [OWNED] - Enables 'scan-analyze' with a depth up to 5.
	DeepscanV2.exe - [OWNED] - Enables 'scan-analyze' with a depth up to 10.
	AutoLink.exe - [OWNED] - Enables direct connect via 'scan-analyze'.
	Formulas.exe - [OWNED] - Unlock access to the formulas API.
	*/
	ns.singularity.createProgram("BruteSSH.exe", false);
	ns.singularity.createProgram("FTPCrack.exe", false);
	ns.singularity.createProgram("relaySMTP.exe", false);
	ns.singularity.createProgram("HTTPWorm.exe", false);
	ns.singularity.createProgram("SQLInject.exe", false);
	ns.singularity.createProgram("autolink.exe", false);
	ns.singularity.createProgram("deepscanV1.exe", false);
	ns.singularity.createProgram("deepscanv2.exe", false);
	ns.singularity.createProgram("serverprofiler.exe", false);
	ns.singularity.createProgram("formulas.exe", false);
	// purchase tor router
	while (ns.singularity.purchaseTor() == false) { ns.sleep(6000) }
	// purchase all programs when money is available 
	ns.exec("/scripts/purchase-programs.js", "home");
	// train hacking skills for free
	//ns.exec("/scripts/trainUniversity.js", "home", 1, "Rothman University", "Computer Science");
	// work at companies where we have jobs (infinite loop)
	ns.exec("/scripts/work4Companies.js", "home");
	// work at factions we have joined (infinite loop)
	ns.exec("/scripts/work4Factions.js", "home");
	// purchase servers (infinite loop)
	// spawn purchase-hacknetnodes at the end
	ns.exec("/scripts/purchase-servers.js", "home");
	// purchase hacknet nodes (infinite loop), now included after servers purchased
	// ns.exec("/scripts/purchase-HacknetNodes.js", "home");
	// apply for jobss
	ns.exec("/scripts/apply4jobs.js", "home");
	// deploiement backdoors
	ns.exec("/scripts/deployBackdoors.js", "home");
	// spend hashes toutes les 10 secondes
	ns.exec("/scripts/spendhashes.js", "home", 10000);
	ns.tprint(". relaunch complete");
}