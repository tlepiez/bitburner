/** @param {NS} ns */
function getTimestamp() {
	const event = new Date();
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

	return event.toLocaleDateString('fr-fr', options) + " " + event.toLocaleTimeString('fr-fr') + " - ";
}
export async function main(ns) {
	const player = ns.getPlayer();
	const cities = ["Sector-12", "Aevum", "Volhaven", "Ishima", "Chongqing", "New Tokyo"];
	const locations = ["FoodNStuff", "Joe's Guns", "Blade Industries", "Four Sigma", "National Security Agency", "Carmichael Security", "MegaCorp"
		, "Central Intelligence Agency", "DeltaOne", "Universal Energy", "Alpha Enterprises", "Icarus Microsystems"
		, "Aevum Police Headquarters", "Bachman & Associates", "Fulcrum Technologies", "ECorp", "AeroCorp"
		, "NetLink Technologies", "Rho Construction", "Clarke Incorporated", "Galactic Cybersystems"
		, "Watchdog Security", "Storm Technologies", "Nova Medical", "Omega Software", "DefComm", "VitaLife"
		, "Noodle Bar", "Global Pharmaceuticals", "KuaiGong International", "Solaris Space Systems", "Omnia Cybersystems"
		, "SysCore Securities", "OmniTek Incorporated", "Helios Labs", "NWO", "CompuTek", "LexoCorp"]
	var currentcity = ns.getPlayer().city;
	const universities = ["ZB Institute of Technology", "Summit University"];
	const courses = ["Computer Science"];
	const maxJobs = locations.length;
	var companies = Object.getOwnPropertyNames(player.jobs);
	var njobs = companies.length;
	var jobs = Object.values(player.jobs);
	var work = null;

	ns.tail();
	while (njobs < maxJobs) {
		for (let nextcity of cities) {
			ns.print(getTimestamp() + " Travel to " + nextcity);
			ns.singularity.travelToCity(nextcity);
			currentcity = ns.getPlayer().city;
			ns.print("arrived in " + currentcity);
			// list companies
			for (let nextcompany of locations) {
				// go to Employers
				if (ns.singularity.getCurrentWork() != null) {
					work = Object.values(ns.singularity.getCurrentWork());
					ns.print(getTimestamp() + " current work:\t" + work);
				}
				//goToLocation(locationName: string): boolean;
				if (ns.singularity.goToLocation(nextcompany)) {
					// applyToCompany(companyName: string, field: string): boolean;
					ns.print(getTimestamp() + ". current location:" + ns.getPlayer().location);
					//ns.tprint("current jobs " + Object.values(player.jobs));
					njobs = jobs.length;

					// if software consultant,apply
					if (ns.singularity.applyToCompany(nextcompany, "Software Consultant")) {
						// affiche job en cours
						ns.print("new work:Software Consultant");
					} else
						// if business job,apply
						if (ns.singularity.applyToCompany(nextcompany, "Business")) {
							// affiche job en cours
							ns.print("new work:Business");
						} else
							// if IT job,apply
							if (ns.singularity.applyToCompany(nextcompany, "IT")) {
								// affiche job en cours
								ns.print("new work:IT");
							} else
								// if software job,apply
								if (ns.singularity.applyToCompany(nextcompany, "Software")) {
									// affiche job en cours
									ns.print("new work:Software");
								} else

									// if waiter apply
									if (ns.singularity.applyToCompany(nextcompany, "Employee")) {
										// affiche job en cours
										ns.print("new work:Employee");
									} else
										// if waiter apply
										if (ns.singularity.applyToCompany(nextcompany, "Waiter")) {
											// affiche job en cours
											ns.print("new work:Waiter");
										} else {
											ns.print("not able to apply for a job, still at " + ns.getPlayer().location);
										}
				}
			}
		}
		companies = Object.getOwnPropertyNames(player.jobs);
		njobs = companies.length;
		//ns.print("job " + njobs + " companies:\t" + companies);
		jobs = Object.values(player.jobs);
		//ns.print("job " + jobs.length + " values:\t" + jobs);
		ns.print("Company ( Job )");
		for (let i = 0; i < njobs; i++) {
			ns.print("#" + i + ". " + companies[i] + " (" + jobs[i] + ")");
		}
		await ns.sleep(180000); // 30 mn to wait to allow exp gains and hopefully new jobs
	}
}