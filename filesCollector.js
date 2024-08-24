// collect server name on port 1 
// and retrieve files from the server
/** @param {NS} ns **/
export async function main(ns) {
	ns.print("----collect files from hosts already scanned");
	var serv = ns.readPort(1); //lecture 
	var files;
	var filename;
	var numhosts = 0;
	var numfiles = 0;
	while (serv != "") {
		if (ns.serverExists(serv)) {
			numhosts++;
			files = ns.ls(serv);
			numfiles = 0;
			ns.print(". host: " + serv + " " + files.length + " files: " + files);

			if (files.length > 0) {
				for (var i = 0; i < files.length; ++i) {
					filename = files[i];
					if ((filename != "/scripts/basic-hack.js") &&
						(filename.endsWith(".cct") == false)) { //avoid our own script
						await ns.scp(filename, "home", serv);
						numfiles++;
						ns.print(".    " + filename + " copied");
					}
				}
				//print(".    "+ numfiles +" files copied");
			}
		}
		await ns.sleep(3000);
		serv = ns.readPort(1);
	}
	ns.tprint(".    filesCollector completed");
}