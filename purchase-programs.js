/** @param {NS} ns **/

export async function main(ns) {
	var alldone = false;
	while (alldone == false) {
		alldone = true;
		//singularity : purchaseProgram(programName: string)
		if (ns.fileExists("BruteSSH.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("BruteSSH.exe");
		}
		if (ns.fileExists("FTPCrack.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("FTPCrack.exe");
		}
		if (ns.fileExists("relaySMTP.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("relaySMTP.exe");
		}
		if (ns.fileExists("HTTPWorm.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("HTTPWorm.exe");
		}
		if (ns.fileExists("SQLInject.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("SQLInject.exe");
		}
		if (ns.fileExists("AutoLink.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("AutoLink.exe");
		}
		if (ns.fileExists("DeepscanV1.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("deepscanV1.exe");
		}
		if (ns.fileExists("DeepscanV2.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("deepscanV2.exe");
		}
		if (ns.fileExists("ServerProfiler.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("ServerProfiler.exe");
		}
		if (ns.fileExists("Formulas.exe", "home") == false) {
			alldone = false;
			ns.singularity.purchaseProgram("formulas.exe");
		}

		await ns.sleep(60000); // wait 1mn to earn money if needed
	}
	ns.tprint("All programs ready now.");
}