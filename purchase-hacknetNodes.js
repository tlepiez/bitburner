/** @param {NS} ns **/
/** purchase-hacknetNodes.js
 * V2.1 release note
 * - bugfix : infinite loop node 1
 * - 
 * V2.0 release note
 * - plus de preference a la creation de 10 noeuds
 * - essaie booste au max existant d abord, 
 * - creation nouveau noeud si il reste de largent
 */
import * as netmap from "/scripts/libscan.js";
var cnt = 0;
var maxRam = 1024 * 8; // 8 TB is max authorized
var maxCore = 32;
var maxLevel = 128;
var maxCache = 1;
var res = 0;
var boolres = false;
var allmax = false;
var round = 0;
maxCore = 16;
maxRam = 64; //GB
function myMoney(ns) {
  return ns.getPlayer().money;
}
function increaseNode(ns) {
  var res = 0;

  if (ns.hacknet.numNodes() < cnt) {
    // on essaie d'acheter un nouveau noeud
    res = ns.hacknet.purchaseNode();
    if (res > -1) {
      ns.print(netmap.getTimestamp() + " Purchased hacknet Node with index " + res);
    };

  }

}
function increaseCache(ns) {
  boolres = false;
  // increase cache 
  for (var i = 0; i < ns.hacknet.numNodes(); i++) {
    if (ns.hacknet.getNodeStats(i).cache < maxCache) {
      allmax = false;
      var cost = ns.hacknet.getCacheUpgradeCost(i, 1);
      if (cost != Infinity) {
        if (myMoney(ns) > cost) {
          ns.print(netmap.getTimestamp() + " upgrade cache " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
          boolres = ns.hacknet.upgradeCache(i, 1);
          ns.print(netmap.getTimestamp() + " hacknet node-" + i + " cache:" + ns.hacknet.getNodeStats(i).cache);
        }
      } else {
        ns.print(netmap.getTimestamp() + " infinity cost to upgrade cache of node #" + i);
      };
    };
  };


}
function increaseRam(ns, i) {
  boolres = false;
  // increase RAM
  if (ns.hacknet.getNodeStats(i).ram < maxRam) {
    allmax = false;
    var cost = ns.hacknet.getRamUpgradeCost(i, 1);
    ns.print(netmap.getTimestamp() + " cost of Ram upgrade " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
    if (cost != Infinity) {
      if (myMoney(ns) > cost) {
        ns.print(netmap.getTimestamp() + " try to upgrade Ram ");
        boolres = ns.hacknet.upgradeRam(i, 1);
        ns.print(netmap.getTimestamp() + " hacknet node-" + i + " RAM:" + ns.hacknet.getNodeStats(i).ram);
      }
    } else {
      ns.print(netmap.getTimestamp() + " infinity cost to upgrade RAM of node #" + i);
    };
  };

}
function increaseCore(ns, i) {
  boolres = false;
  // increase cores 
  if (ns.hacknet.getNodeStats(i).cores < maxCore) {
    allmax = false;
    var cost = ns.hacknet.getCoreUpgradeCost(i, 1);
    ns.print(netmap.getTimestamp() + " cost of core upgrade " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
    if (cost != Infinity) {
      if (myMoney(ns) > cost) {
        ns.print(netmap.getTimestamp() + " upgrade core ");
        boolres = ns.hacknet.upgradeCore(i, 1);
        ns.print(netmap.getTimestamp() + " hacknet node-" + i + " cores:" + ns.hacknet.getNodeStats(i).cores);
      }
    } else {
      ns.print(netmap.getTimestamp() + " infinity cost to upgrade core of node #" + i);
    };
  };

}
function increaseLevel(ns, i) {
  boolres = false;
  // increase level
  if (ns.hacknet.getNodeStats(i).level < maxLevel) {
    allmax = false;
    var cost = ns.hacknet.getLevelUpgradeCost(i, 10);
    ns.print(netmap.getTimestamp() + " cost of level upgrade " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
    if (cost != Infinity) {
      if (myMoney(ns) > cost) {
        ns.print(netmap.getTimestamp() + " upgrade level ");
        boolres = ns.hacknet.upgradeLevel(i, 10);
        ns.print(netmap.getTimestamp() + " hacknet node-" + i + " level:" + ns.hacknet.getNodeStats(i).level);
      } else {
        cost = ns.hacknet.getLevelUpgradeCost(i, 5);
        if (cost != Infinity) {
          if (myMoney(ns) > cost) {
            ns.print(netmap.getTimestamp() + " upgrade level " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
            boolres = ns.hacknet.upgradeLevel(i, 5);
            ns.print(netmap.getTimestamp() + " hacknet node-" + i + " level:" + ns.hacknet.getNodeStats(i).level);
          } else {
            cost = ns.hacknet.getLevelUpgradeCost(i, 1);
            if (cost != Infinity) {
              if (myMoney(ns) > cost) {
                ns.print(netmap.getTimestamp() + " upgrade level " + ns.formatNumber(cost, 2) + " . Budget " + ns.formatNumber(myMoney(ns), 2));
                boolres = ns.hacknet.upgradeLevel(i, 1);
                ns.print(netmap.getTimestamp() + " hacknet node-" + i + " level:" + ns.hacknet.getNodeStats(i).level);
              }
            };
          }
        } else {
          ns.print(netmap.getTimestamp() + " infinity cost to upgrade level of node #" + i);
        };
      }
    };
  };
}
export async function main(ns) {

  cnt = ns.hacknet.maxNumNodes();
  const player = ns.getPlayer();
  const home = ns.getServer();
  //var homecores = home.cpucores;
  const args = ns.flags([["help", false]]);
  if (args.help) {
    ns.tprint("This script purchases ns.hacknet nodes.");
    ns.tprint(`Usage: run ${ns.getScriptName()} [{ nodesCount }[{ maxRam }[{ maxCore }[{ maxLevel }]]]`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} 64 1024 16 64 `);
    return;
  }
  if (ns.args.length > 0) { // limit max number of hacknet nodes, by default = max
    cnt = ns.args[0];
  }
  if (ns.args.length > 1) {
    maxRam = ns.args[1];
  }
  if (ns.args.length > 2) {
    maxCore = ns.args[2];
  }
  if (ns.args.length > 3) {
    maxLevel = ns.args[3];
  }
  /*
  maxRam = Math.min(maxRam, ns.hacknet.maxRam);
  maxCore = Math.min(maxCore, ns.hacknet.maxCore);
  maxLevel = Math.min(maxLevel, ns.hacknet.maxLevel);
  maxCache = ns.hacknet.maxCache;
  */
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("sleep");

  ns.print("max ns.hacknet nodes :" + cnt);
  ns.print("current active nodes :" + ns.hacknet.numNodes());
  ns.print("max Ram           :" + maxRam);
  ns.print("max Core          :" + maxCore);
  ns.print("max Level         :" + maxLevel);

  allmax = false;
  // wait for programs , avoid spend money on nodes if not all programs are owned
  while (ns.fileExists("BruteSSH.exe") == false) { await ns.sleep(60000) }
  while (ns.fileExists("FTPCrack.exe") == false) { await ns.sleep(60000) }
  while (ns.fileExists("relaySMTP.exe") == false) { await ns.sleep(60000) }
  while (ns.fileExists("HTTPWorm.exe") == false) { await ns.sleep(60000) }
  while (ns.fileExists("SQLInject.exe") == false) { await ns.sleep(60000) }

  while (allmax == false) {
    allmax = true;
    ns.print(netmap.getTimestamp() + " round " + (++round) + " my money: " + ns.formatNumber(myMoney(ns), 2));
    // augmenter la production des noeuds existants
    for (var i = 0; i < ns.hacknet.numNodes(); i++) {
      boolres = true;
      while (boolres == true) {
        ns.print(netmap.getTimestamp() + " round " + (++round) + " node-" + i);
        // increase RAM
        increaseRam(ns, i);

        // increase level
        increaseLevel(ns, i);

        // increase cores 
        increaseCore(ns, i);
        await ns.sleep(1000);
      }
    }; // for loop on nodes
    // accroitre le nombre de nodes
    increaseNode(ns);

    await ns.sleep(3000);
  };
  ns.print(netmap.getTimestamp() + " All nodes upgraded to " + maxRam + "GB RAM");
  ns.print(netmap.getTimestamp() + " All nodes upgraded to level " + maxLevel);
  ns.print(netmap.getTimestamp() + " All nodes upgraded to " + maxCore + " cores");
}