/** @param {NS} ns **/
export async function main(ns) {
	// Initial Program loading : launch it at reboot
	// script can be relaunched several times
	// it search for new servers without root access
	// and add to thelist of hacks
	var target = "joesguns";
	ns.nuke(target);
	// -----launch separate processes-----------
	// complete recursive scan of the network
	ns.exec("/scripts/discover-network.js", "home", 1, target);
	// purchase tor
	ns.singularity.purchaseTor();
	/* Programs
	BruteSSH.exe - - Opens up SSH Ports.
	FTPCrack.exe - - Opens up FTP Ports.
	relaySMTP.exe -- Opens up SMTP Ports.
	HTTPWorm.exe - - Opens up HTTP Ports.
	SQLInject.exe -- Opens up SQL Ports.
	ServerProfiler.exe - Displays detailed information about a server.
	DeepscanV1.exe - Enables 'scan-analyze' with a depth up to 5.
	DeepscanV2.exe - Enables 'scan-analyze' with a depth up to 10.
	AutoLink.exe - - Enables direct connect via 'scan-analyze'.
	Formulas.exe - - Unlock access to the formulas API.
	*/
	ns.exec("/scripts/createPrograms.js", "home");
	// spend hashes toutes les 10 secondes
	ns.exec("/scripts/spendhashes.js", "home");
	// bladeburner skills upgrade
	ns.exec("/scripts/upgradeSkills.js", "home");
	// apply for jobss
	ns.exec("/scripts/apply4jobs.js", "home");
	// train hacking skills for free
	// ns.exec("/scripts/trainUniversity.js", "home", 1, "Rothman University", "Computer Science");
	// ns.singularity.universityCourse("rothman university", "computer science", false);
	// work at companies where we have jobs (infinite loop)
	ns.exec("/scripts/work4Companies.js", "home");
	// work at factions we have joined (infinite loop)
	ns.exec("/scripts/work4Factions.js", "home");
	// upgrade home server (infinite loop)
	ns.exec("/scripts/upgradeHome.js");
	// deploiement backdoors
	ns.exec("/scripts/deployBackdoors.js", "home");
	// purchase tor router
	while (ns.singularity.purchaseTor() == false) { await ns.sleep(6000) }
	// purchase servers (infinite loop)
	ns.exec("/scripts/purchase-servers.js", "home");
	// purchase hacknet nodes (infinite loop), 
	//ns.exec("/scripts/purchase-hacknetNodes.js", "home");


	//ns.tprint(". relaunch complete");
}