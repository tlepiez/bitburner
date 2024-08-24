/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help) {
	  ns.tprint("This script will enhance your HUD (Heads up Display) with custom statistics.");
	  ns.tprint(`Usage: run ${ns.getScriptName()}`);
	  ns.tprint("Example:");
	  ns.tprint(`> run ${ns.getScriptName()}`);
	  return;
	}
  
	const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	//const hook2 = doc.getElementById('overview-extra-hook-2');
	var nodeProdSec = 0;
	var production = 0;
	var numNodes = ns.hacknet.numNodes();
	while (true) {
	  try {
		const headers = []
		const values = [];
		// Add script income per second
		headers.push("Scr.");
		//			values.push(ns.getScriptIncome()[0].toPrecision(5) + '/sec');
		values.push("$" + ns.formatNumber(ns.getTotalScriptIncome()[0], 3) + '/s');
		// Add script exp gain rate per second
		headers.push("Scr.");
		values.push(ns.formatNumber(ns.getTotalScriptExpGain(), 3) + '/s');
		// Add total hacknet nodes production
		production = 0;
		nodeProdSec = 0;
		numNodes = ns.hacknet.numNodes();
		for (var i = 0; i < numNodes; i++) {
		  nodeProdSec = ns.hacknet.getNodeStats(i).production;
		  ns.print(" node-" + i + " production:" + nodeProdSec);
		  production += nodeProdSec;
		}
		ns.print("total prod per sec: " + production);
		headers.push("Prod");
		values.push("$" + ns.formatNumber(production, 3) + '/s');
		// TODO: Add more neat stuff
  
		// Now drop it into the placeholder elements
		// 3 columns hook0 | hook1 | hook2
		// if hook2 is not specified, hook0 and hook1 use the full width
		hook0.innerText = headers.join("\n");
		hook1.innerText = values.join("\n");
		//hook2.innerText = '';
  
	  } catch (err) { // This might come in handy later
		ns.print("ERROR: Update Skipped: " + String(err));
	  }
	  await ns.sleep(1000);
	}
  }