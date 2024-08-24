/** @param {NS} ns **/
export async function main(ns) {
	const player = ns.getPlayer();
	/*
	Property	Type	Description
	mults.agility_exp	number	
	agility_exp	number	
	mults.agility	number			
	mults.bladeburner_analysis	number	
	mults.bladeburner_max_stamina	number	
	mults.bladeburner_stamina_gain	number	
	mults.bladeburner_success_chance	number	
	mults.charisma_exp	number	
	charisma_exp	number	
	mults.charisma	number	
	mults.company_rep	number	
	createProgramName	string	
	createProgramReqLvl	number	
	mults.crime_money	number	
	mults.crime_success	number	
	crimeType	string	
	mults.defense_exp	number	
	defense_exp	number	
	mults.defense	number		
	mults.dexterity_exp	number	
	dexterity_exp	number	
	mults.dexterity	number		
	mults.faction_rep	number		
	mults.hacking_chance	number	
	hacking_exp_mult	number	
	hacking_exp	number	
	mults.hacking_grow	number	
	mults.hacking_money	number	
	mults.hacking	number	
	mults.hacking_speed	number		
	mults.hacknet_node_core_cost	number	
	mults.hacknet_node_level_cost	number	
	mults.hacknet_node_money	number	
	mults.hacknet_node_purchase_cost	number	
	mults.hacknet_node_ram_cost	number	
	has4SData	boolean	
	has4SDataTixApi	boolean	
	hasCorporation	boolean	
	hasTixApiAccess	boolean	
	hasWseAccount	boolean		
	isWorking	boolean	
	numPeopleKilled	number	
	playtimeSinceLastAug	number	
	playtimeSinceLastBitnode	number	
	mults.strength_exp	number	
	strength_exp	number	
	mults.strength	number			
	totalPlaytime	number	
	mults.work_money	number	
	
	The work system is completely reworked and ns.getPlayer().workChaExpGained no longer exists. 
	This data is likely available inside ns.getPlayer().currentWork, skills, exp, or hp

	workAgiExpGained	number	
	workAgiExpGainRate	number	
	workChaExpGained	number	
	workChaExpGainRate	number	
	workDefExpGained	number	
	workDefExpGainRate	number	
	workDexExpGained	number	
	workDexExpGainRate	number	
	workHackExpGained	number	
	workHackExpGainRate	number	
	workMoneyGained	number	
	workMoneyGainRate	number	
	workMoneyLossRate	number	
	workRepGained	number	
	workRepGainRate	number	
	workStrExpGained	number	
	workStrExpGainRate	number	
	workType	string	
	
	*/
	ns.tail();
	ns.disableLog('ALL');
	ns.print("=======================");
	//ns.print("bitnode n:\t" + player.bitNodeN); //deprecated 2.3.0
	ns.print("bitnode n:\t" + ns.getResetInfo().currentNode);
	ns.print("city:\t" + player.city);
	ns.print("company:\t" + player.location);
	if (ns.bladeburner.joinBladeburnerFaction) {
		ns.print("bladeburner:\t" + ns.bladeburner.getCurrentAction().type + ":"
			+ ns.bladeburner.getCurrentAction().name);
		ns.print("rank:\t"+ns.bladeburner.getRank());
	}
	ns.print("--- university ---")
	ns.print("course name:\t" + player.className);
	//await ns.sleep(10000);
	ns.print("--- companies ---")
	const companies = Object.keys(player.jobs);
	const jobs = Object.values(player.jobs);
	//ns.tprint("player.jobs:" + companies);
	const njobs = companies.length;

	ns.print("Company ( Job )");
	for (let i = 0; i < njobs; i++) {
		ns.print("#" + i + ". " + companies[i] + " (" + jobs[i] + ")");
	}

	ns.print("-----------------------");
	ns.print("Tor router:\t" + player.tor);
	// player info
	ns.print("-----------------------");
	ns.print("HP:\t\t" + player.hp.current + "/" + player.hp.max);
	ns.print("Money:\t" + ns.nFormat(player.money, "($ 0.00 a)"));
	ns.print("Hacking:\t" + ns.getHackingLevel());//player.exp.hacking);
	ns.print("-----------------------");
	ns.print("Strength:\t" + player.exp.strength);
	ns.print("Defense:\t" + player.exp.defense);
	ns.print("Dexterity:\t" + player.exp.dexterity);
	ns.print("Agility:\t" + player.exp.agility);
	ns.print("Charisma:\t" + player.exp.charisma);
	ns.print("Intelligence:\t" + player.exp.intelligence);
	// required ; Singularity API (source node 4)
	ns.print("--- factions ---")
	/*
	if (ns.checkFactionInvitations() != "") {
		ns.print("Invitations :");
		ns.print(ns.checkFactionInvitations());
	}
	*/
	ns.print("Member of :");
	for (const faction of player.factions) {
		ns.print(faction);
	}
	//ns.print("current work:\t" + player.currentWorkFactionName);
	var work = Object.values(ns.singularity.getCurrentWork());
	/* work object: 
	COMPANY, gain, location
	COMPANY | 671 | FoodNStuff
	COMPANY | 97  | Joe's Guns
	#0. FoodNStuff (Employee)
	#1. Joe's Guns (Employee)
	#2. Carmichael Security (Senior Software Consultant)
	#3. Universal Energy (Software Consultant)
	#4. Alpha Enterprises (Software Consultant)
	#5. Icarus Microsystems (Software Consultant)
	#6. Galactic Cybersystems (Software Consultant)
	#7. Watchdog Security (Software Consultant)
	#8. Helios Labs (Software Consultant)
	#9. LexoCorp (Software Consultant)
	#10. Storm Technologies (Software Consultant)
	#11. Nova Medical (Software Consultant)
	#12. Omega Software (Senior Software Consultant)
	#13. DefComm (Software Consultant)	#14. VitaLife (Software Consultant)
	#15. Noodle Bar (Waiter)
	#16. Global Pharmaceuticals (Software Consultant)
	#17. Aevum Police Headquarters (Software Engineering Intern)
	#18. Bachman & Associates (IT Intern)
	#19. Fulcrum Technologies (IT Intern)
	#20. ECorp (IT Intern)
	#21. AeroCorp (IT Intern)
	#22. Rho Construction (Software Engineering Intern)
	#23. NetLink Technologies (IT Intern)
	#24. Clarke Incorporated (IT Intern)
	#25. DeltaOne (IT Intern)
	#26. Central Intelligence Agency (IT Intern)
	#27. MegaCorp (IT Intern)
	#28. National Security Agency (IT Intern)
	#29. Four Sigma (IT Intern)
	#30. Blade Industries (IT Intern)
	#31. Omnia Cybersystems (IT Intern)
	#32. SysCore Securities (IT Intern)
	#33. OmniTek Incorporated (IT Intern)
	#34. NWO (IT Intern)
	#35. CompuTek (IT Intern)
	#36. KuaiGong International (IT Intern)
	#37. Solaris Space Systems (IT Intern)

	#38. Bladeburners

	FACTION, gain, worktype, faction name
	FACTION | 26 | FIELD   | Tetrads
	FACTION | 33 | HACKING | Tian Di Hui
	FACTION | 32 | FIELD   | Chongqing
	FACTION | 27 | HACKING | Netburners
	FACTION | 25 | HACKING | NiteSec
	FACTION | 25 | HACKING | The Black Hand
	FACTION | 25 | HACKING | Ishima
	FACTION | 25 | HACKING | New Tokyo
	FACTION | 25 | FIELD   | Tetrads
	FACTION | 25 | FIELD   | Slum Snakes
	FACTION | 25 | HACKING | Netburners
	FACTION | 25 | FIELD   | Tian Di Hui
	FACTION | 25 | HACKING | CyberSec
	*/
	ns.print("current work:\t" + work);
}