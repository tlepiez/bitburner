// script can be relaunched several times
// it search for new servers without root access
// and add to thelist of hacks
// * networkDiscovery V3 
import * as netmap from "/scripts/libscan.js";

var forcePorts = 0;
var p = 0;
var target = "joesguns";
var hackerScript = "scripts/basic-hack.js";
var fullmode = "STD";// STD of FULL to kill all processes to use full mem for hack
var hackFullServer = false;
var areAllServerHacked = false;
var scriptRAM = 0;
var nloops = 0;
var waitTime = 20000; // 20 seconds

function calcForcePorts(ns) {
  //  calculate max num of ports we can force 
  var forcePorts = 0;
  if (ns.fileExists("BruteSSH.exe") == true) {
    forcePorts++;
  }
  if (ns.fileExists("FTPCrack.exe") == true) {
    forcePorts++;
  }
  if (ns.fileExists("relaySMTP.exe") == true) {
    forcePorts++;
  }
  if (ns.fileExists("HTTPWorm.exe") == true) {
    forcePorts++;
  }
  if (ns.fileExists("SQLInject.exe") == true) {
    forcePorts++;
  }
  ns.print(netmap.getTimestamp() + " forcePorts=" + forcePorts);
  return forcePorts;
}

async function calcHack(ns, server, hackFullServer, hackerScript, target) {
  // verification 
  var forcePorts = calcForcePorts(ns); //get our capacity at the time the loop start
  var servInfo = ns.getServer(server);
  const availableRam = servInfo.maxRam - servInfo.ramUsed;
  ns.tprint(`check host ${server} . avail/max RAM: ${availableRam}/${servInfo.maxRam}GB ROOT access ${servInfo.hasAdminRights}`);
  ns.print("hack: forcePorts=" + forcePorts + " required:" + ns.getServerNumPortsRequired(server));
  if (servInfo.hasAdminRights == false) {
    if (servInfo.sshPortOpen == false) {
      if (ns.fileExists("BruteSSH.exe", "home"))
        ns.brutessh(server);
    }
    if (servInfo.ftpPortOpen == false) {
      if (ns.fileExists("FTPCrack.exe", "home"))
        ns.ftpcrack(server);
    }
    if (servInfo.smtpPortOpen == false) {
      if (ns.fileExists("relaySMTP.exe", "home"))
        ns.relaysmtp(server);
    }
    if (servInfo.httpPortOpen == false) {
      if (ns.fileExists("HTTPWorm.exe", "home"))
        ns.httpworm(server);
    }
    if (servInfo.sqlPortOpen == false) {
      if (ns.fileExists("SQLInject.exe", "home"))
        ns.sqlinject(server);
    }
    if (ns.getServerNumPortsRequired(server) <= forcePorts) {
      ns.print("hack:trying to get ROOT access to " + server);

      ns.nuke(server);
      // now ROOT ACCESS should be YES
    }
  }
  servInfo = ns.getServer(server); //refresh data 
  if (servInfo.purchasedByPlayer == false) {
    if (servInfo.hasAdminRights == true) {
      ns.print("hack: ROOT access for " + server);
      if (hackFullServer) {
        //free full RAM by killing all running process
        ns.print("kill all process running on " + server);
        ns.killall(server);
      }
      if (availableRam >= scriptRAM) { // only servers with RAM > 0
        ns.tprint(`-- deploy on host ${server} . target: ${target}`);
        ns.exec("scripts/deploy.js", "home", 1, server, hackerScript, target);
      }
    } else {
      areAllServerHacked = false;
    }
  }
  return areAllServerHacked;
}
/** @param {NS} ns **/
export async function main(ns) {
  var hcount = 0;
  var serverHacked;
  const args = ns.flags([["help", false]]);

  if (args.help) {
    ns.tprint("This script scan the network and deploy hack script.");
    ns.tprint("USAGE: run ${ns.getScriptName()} [SERVER_NAME [{FULL|STD} [SCRIPT]]] ");
    ns.tprint("Examples: (default is FULL)");
    ns.tprint("> run ${ns.getScriptName()} n00dles ");
    ns.tprint("> run ${ns.getScriptName()} n00dles {FULL|STD}");
    ns.tprint("> run ${ns.getScriptName()} n00dles {FULL|STD} /scripts/basic-hack.js ");
    exit(1);
  }
  switch (ns.args.length) {
    case 3: hackerScript = ns.args[2];
    case 2: fullmode = ns.args[1];
    case 1: target = ns.args[0];
  }
  ns.print("------------------------");
  ns.tprint(".target.     : " + target);
  ns.tprint(".hackerScript: " + hackerScript);
  ns.tprint(".mode.       : " + fullmode);
  if (fullmode == "FULL") {
    hackFullServer = true;
  }
  //open log windows
  ns.tail();
  scriptRAM = ns.getScriptRam(hackerScript); // GB
  ns.tprint(".RAM per script: " + scriptRAM);
  // loop until all servers are hacked 
  // we may wait for new program to be available at relaunch time 
  areAllServerHacked = false;
  while (areAllServerHacked == false) {
    nloops++;
    ns.print(netmap.getTimestamp() + " loop #" + nloops);
    areAllServerHacked = true; // start by considering we can hack them all
    //const servers = netmap.list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
    const servers = netmap.list_servers(ns);
    for (const server of servers) {
      ns.print(`-> host found : ${server} . `);
      const servInfo = ns.getServer(server);
      const max = ns.getServerMaxRam(server);
      const availableRam = max - ns.getServerUsedRam(server);

      const requiredLevel = ns.getServerRequiredHackingLevel(server);
      const hackChance = ns.hackAnalyzeChance(server);
      const money = ns.formatNumber(ns.getServerMoneyAvailable(server), 2); // money in M$
      const hackDifficulty = servInfo.hackDifficulty;
      const hostname = ns.sprintf("%20s", server);
      ns.print(`host [${hcount}]found ${hostname} .  lvl: ${requiredLevel} ( ${(ns.nFormat(hackChance, "0.00 %"))}) ${hackDifficulty}\t. ${money}`);

      serverHacked = await calcHack(ns, server, hackFullServer, hackerScript, target);
      if (ns.getServer(server).hasAdminRights == false) { // fail to gain root access
        areAllServerHacked = false; // not all servers hacked
      }
      hcount++;
    }
    ns.tprint(servers.length + " servers scanned.");

    if (forcePorts < 5) {
      p = forcePorts;
      while ((forcePorts == p) && (forcePorts < 5)) {
        await ns.sleep(waitTime);
        // check if new capacity has been gained
        forcePorts = calcForcePorts(ns);
      }
    } else {
      // only to avoid infinite loop
      // if forceport = 5 and some servers without root acces,
      // this script cannot solved.
      areAllServerHacked = true;
    }

  } // loop until all servers are hacked

  ns.tprint(".discovery complete");
}