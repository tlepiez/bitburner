/** @param {NS} ns **/
import * as netmap from "/scripts/libscan.js";
// purchase-server.js
export async function main(ns) {
  // How much RAM each purchased server will have. In this case, it'll
  // be {ram}GB.
  var hackerScript = "scripts/basic-hack.js";
  var ram = 256;
  var target = "joesguns";
  const args = ns.flags([["help", false]]);

  if (args.help) {
    ns.tprint("This script purchase servers.");
    ns.tprint(`Usage: run ${ns.getScriptName()} [{ram}]`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} 256`);
    return;
  }
  if (ns.args.length > 0) {
    ram = ns.args[0];
  }	// Iterator we'll use for our loop
  const newServerCost = ns.getPurchasedServerCost(ram);
  var i = ns.getPurchasedServers().length;
  var hostname = "pserv-*";
  ns.tail();
  // Continuously try to purchase servers until we've reached the maximum
  const maxServers = ns.getPurchasedServerLimit();
  ns.print(`${netmap.getTimestamp()} ` + i + " servers owned against limit of " + maxServers);
  // wait for programs 
  while (ns.fileExists("BruteSSH.exe") == false) { await ns.sleep(6000) }
  while (ns.fileExists("FTPCrack.exe") == false) { await ns.sleep(6000) }
  while (ns.fileExists("relaySMTP.exe") == false) { await ns.sleep(6000) }
  while (ns.fileExists("HTTPWorm.exe") == false) { await ns.sleep(6000) }
  while (ns.fileExists("SQLInject.exe") == false) { await ns.sleep(6000) }

  // amount of servers
  for (var i = 0; i < maxServers; i++) {
    hostname = "pserv-" + i;
    if (ns.serverExists(hostname) == false) {
      // Check if we have enough money to purchase a server
      // If we don't have enough money, then wait
      //  1. Purchase the server
      //  2. deploy hacking script with max Threads on the purchased server
      //  4. Increment our iterator to indicate that we've bought a new server
      while (ns.getServerMoneyAvailable("home") < newServerCost) {
        ns.print(`${netmap.getTimestamp()} not enough, need ` + ns.formatNumber(newServerCost, 2));
        await ns.sleep(60000);
      }
      hostname = ns.purchaseServer("pserv-" + i, ram);
    }
    if (ns.serverExists(hostname) == true) {
      ns.exec("/scripts/deploy.js", "home", 1, hostname, hackerScript, target);
    }
  }
}