/** @param {NS} ns */
export async function main(ns) {

	var x = 554750073,
		largest = 1,
		k = 3;

		const args = ns.flags([["help", false]]);
		//open log windows
		ns.tail();
		if (args.help) {
			ns.tprint("This script searches largest prime factor of a number.");
			ns.tprint("USAGE: run ${ns.getScriptName()} {number}  ");
			ns.tprint("Examples:  ");
			ns.tprint("> run ${ns.getScriptName()} 554750073 ");
			exit(1);
		}
		switch (ns.args.length) {
			case 1: x = ns.args[0];
		}
	// If 2 is a factor of x, we treat it separately...
	if (x % 2 == 0) {
		x = x / 2;
		largest = 2;
		while (x % 2 == 0) x = x / 2;
	}
	// ... so we can increase factor with 2 every iteration
	// This loop runs only if k is not bigger than the square
	// root of the remaining x
	while (x > 1 && k <= Math.sqrt(x)) {
		if (x % k == 0) {
			largest = k;
			x = x / k;
			while (x % k == 0) x = x / k;
		}
		k += 2;
	}
	// Give the largest prime factor of x
	if (x == 1) {
		ns.tprint(largest);
	}
	else {
		ns.tprint(x);
	}

}