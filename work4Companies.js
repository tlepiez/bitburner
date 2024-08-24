/** @param {NS} ns **/
/* respawn work for companies where you have jobs

*/
const waitTime = 180000; // 180000ms=3mn

function getTimestamp() {
	const event = new Date();
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

	return event.toLocaleDateString('fr-fr', options) + " " + event.toLocaleTimeString('fr-fr') + " - ";
}

export async function main(ns) {
	var player;
	while (true) {
		ns.print("--- companies ---")
		player = ns.getPlayer();
		var companies = Object.getOwnPropertyNames(player.jobs);
		var njobs = companies.length;
		//ns.print("job " + njobs + " companies:\t" + companies);
		var jobs = Object.values(player.jobs);
		ns.print("Company ( Job )");
		for (let i = 0; i < njobs; i++) {
			ns.print("#" + i + ". " + companies[i] + " (" + jobs[i] + ")");
		}
		//ns.print("job " + jobs.length + " values:\t" + jobs);
		ns.print("-----------------------------------");
		for (let i = 0; i < njobs; i++) {
			ns.print(getTimestamp() + ". work for " + companies[i] + " (" + jobs[i] + ") ");
			ns.singularity.workForCompany(companies[i], false);
			await ns.sleep(waitTime); // wait(=work) 
			//ns.print("reputation +" + player.workRepGained);
		}
	}
}