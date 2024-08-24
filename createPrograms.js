/** @param {NS} ns */
export async function main(ns) {
	var alldone = false;
	var playerLvl = ns.getHackingLevel();
	const BruteSSHlevel = 0;
	const FTPCracklevel = 50;
	const relaySMTPlevel = 250;
	const HTTPWormlevel = 500;
	const SQLInjectlevel = 750;
	/* default levels
	* BruteSSH.exe: 50 
	* FTPCrack.exe: 100 
	* relaySMTP.exe: 250 
	* HTTPWorm.exe: 500 
	* SQLInject.exe: 750 
	* DeepscanV1.exe: 75 
	* DeepscanV2.exe: 400 
	* ServerProfiler.exe: 75 
	* AutoLink.exe: 25
	*/
	while (alldone == false) {
		alldone = true;
		playerLvl = ns.getHackingLevel();
		ns.singularity.purchaseTor();

		if (ns.fileExists("BruteSSH.exe") == false) {
			alldone = false;
			alldone = ns.singularity.purchaseProgram("BruteSSH.exe");
			if ((playerLvl >= BruteSSHlevel) && (ns.fileExists("BruteSSH.exe") == false))
				alldone = ns.singularity.createProgram("BruteSSH.exe", false);

		}
		if (ns.fileExists("FTPCrack.exe") == false) {
			alldone = false;
			alldone = ns.singularity.purchaseProgram("FTPCrack.exe");
			if ((playerLvl >= FTPCracklevel) && (ns.fileExists("FTPCrack.exe") == false))
				alldone = ns.singularity.createProgram("FTPCrack.exe", false);
		}
		if (ns.fileExists("relaySMTP.exe") == false) {
			alldone = false;
			alldone = ns.singularity.purchaseProgram("relaySMTP.exe");
			if ((playerLvl >= relaySMTPlevel) && (ns.fileExists("relaySMTP.exe") == false))
				alldone = ns.singularity.createProgram("relaySMTP.exe", false);
		}
		if (ns.fileExists("HTTPWorm.exe") == false) {
			alldone = false;
			alldone = ns.singularity.purchaseProgram("HTTPWorm.exe");
			if ((playerLvl >= HTTPWormlevel) && (ns.fileExists("HTTPWorm.exe") == false))
				alldone = ns.singularity.createProgram("HTTPWorm.exe", false);
		}
		if (ns.fileExists("SQLInject.exe") == false) {
			alldone = false;
			alldone = ns.singularity.purchaseProgram("SQLInject.exe");
			if ((playerLvl >= SQLInjectlevel) && (ns.fileExists("SQLInject.exe") == false))
				alldone = ns.singularity.createProgram("SQLInject.exe", false);
		}
		/*
		ns.singularity.createProgram("autolink.exe", false);
		ns.singularity.createProgram("deepscanV1.exe", false);
		ns.singularity.createProgram("deepscanv2.exe", false);
		ns.singularity.createProgram("serverprofiler.exe", false);
		ns.singularity.createProgram("formulas.exe", false);
		*/
		await ns.sleep(10000);
	}
	ns.spawn("scripts/purchase-servers.js");
}