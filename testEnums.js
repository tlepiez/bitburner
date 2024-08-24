/** @param {NS} ns */
export async function main(ns) {
	/*
	declare enum CityName 
	
	export type NSEnums = {
	  CityName: typeof CityName;
	  CrimeType: typeof CrimeType;
	  FactionWorkType: typeof FactionWorkType;
	  GymType: typeof GymType;
	  JobName: typeof JobName;
	  LocationName: typeof LocationName;
	  ToastVariant: typeof ToastVariant;
	  UniversityClassType: typeof UniversityClassType;
	};
	*/
	//ns.tprint(ns.enums);

	for (const [key, nextcity] of Object.entries(ns.enums)) {
		ns.tprint("Travel to " + key);
		for (const [keyc, city] of Object.entries(nextcity)) {
			ns.tprint(".\t " + keyc + "\t :" + city);
		}
	}
	/*
	for (let nextcompany of locations) {
				ns.print("company: "+nextcompany)
	}
	*/
}/** @param {NS} ns */