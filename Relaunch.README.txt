/** 
relaunch process :
- 	launch recursive scan of the network to deploy hacking script
	ns.exec("/scripts/networkDiscovery.js", "home", 1, target);
- purchase tor to allow purchase programs
	ns.singularity.purchaseTor();
-	purchase all programs when money is available (loop until all acquired), separate process
	ns.exec("/scripts/purchasePrograms.js", "home");
	
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

-	create program if not acquired 

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

-	apply for jobs
	ns.exec("/scripts/apply4jobs.js", "home");

-	train hacking skills for free
	ns.exec("/scripts/trainUniversity.js", "home", 1, "Rothman University", "Computer Science");


-   work at companies where we have jobs (infinite loop)
    - check jobs of the player before launching it? 
	ns.exec("/scripts/work4Company.js", "home");

-   work at factions we have joined (infinite loop)
	- check factions of the player before launching it?
	ns.exec("/scripts/work4Faction.js", "home");

-	purchase tor router if not yet acquired to allow purchase program to end
	while (ns.singularity.purchaseTor() == false) { ns.sleep(6000) }

-   purchase servers (loop until max purchased)
	ns.exec("/scripts/purchase-server.js", "home");

-   purchase 3 hacknet nodes (infinite loop), now included after servers purchased
	ns.exec("/scripts/purchase-HacknetNodes.js", "home", 3);

-	deploy backdoors (loop until all backdoors installed)

-	join factions when invitation detected (infinite loop)

-	bladeburner actions ?

-	sleeves actions ?

-	stock actions ?

-	contracts resolution actions ?

-	deploy hacking script on home using remaining ram/cpu 


	
