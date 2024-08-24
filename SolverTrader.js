/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	var tx = [ 42,124,7,84,47,93,168,192,15,90,82,193,64];
	var maxtx = 9999;
	if (args.help) {
		ns.tprint("This script lists all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()} {array} [{max tx}]`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} "[146, 88, 181]"`);
		ns.tprint(`> run ${ns.getScriptName()} "[146, 88, 181] 6"`);
		return;
	}
	if (ns.args.length > 0) {
		tx = ns.args[0];
	}

	if (ns.args.length > 1) {
		maxtx = ns.args[1];
	}
	ns.tail();
	var txlen = tx.length;
	ns.tprint(tx);
	var subtx = tx;
	var subtxlen = subtx.length;
	ns.print(txlen + " quotes");
	var min = Math.min(...tx);
	var posmin = tx.indexOf(min);
	ns.print("min:" + min + " pos:" + posmin);
	var max = Math.max(...tx);
	var posmax = tx.indexOf(max);
	ns.print("max:" + max + " pos:" + posmax);
	// at most 1 transaction
	if (posmin < posmax) {
		ns.tprint(" 1 transaction max - min =" + (max - min));
	} else {
		subtx = tx.slice(posmin);
		posmin = 0;
		subtxlen = subtx.length;
		ns.print(subtx);
		max = Math.max(...subtx);
		posmax = subtx.indexOf(max);
		ns.print("2.max:" + max + " pos:" + posmax);
		if (posmin < posmax) {
			ns.tprint(" 1 transaction max - min =" + (max - min));
		}
	}
	ns.print("min:" + min + " pos:" + posmin);
	ns.print("max:" + max + " pos:" + posmax);

	ns.tprint(" ---- as many as possible transactions -- ");
	subtx = tx;
	subtxlen = subtx.length;
	var posdebit = 0;
	var debit = subtx[posdebit];
	var poscredit = 1;
	var credit = subtx[poscredit];
	var txbalance = credit - debit;
	var balance = 0;
	while (subtxlen > 0) {
		//search starting point 
		while ((debit > credit) && (poscredit < subtxlen)) {
			posdebit++;
			debit = subtx[posdebit];
			if (posdebit == poscredit) {
				poscredit++;
				credit = subtx[poscredit];
			}

		}
		// starting point found
		subtx = subtx.slice(posdebit);
		subtxlen = subtx.length;
		posdebit = 0;
		poscredit = 1;
		ns.print(subtx);
		ns.print(subtxlen + " quotes");

		while ((subtx[poscredit] < subtx[poscredit + 1]) && (poscredit + 1 < subtxlen)) {
			poscredit++;
		}
		ns.print("trouve gain max en " + poscredit);
		if (poscredit < subtxlen) {
			credit = subtx[poscredit];
			ns.print("credit - debit =" + credit + " - " + debit);
			txbalance = credit - debit;
			ns.print("txbalance=" + txbalance);
			balance = balance + txbalance;
			ns.print("balance=" + balance);
			subtx = subtx.slice(poscredit);
			subtxlen = subtx.length;
			if (subtxlen > 0) {
				posdebit = 0;
				debit = subtx[posdebit];
				if (subtxlen > 1) {
					poscredit = 1;
					credit = subtx[poscredit];
				} else {
					subtxlen = 0;
				}

				ns.print("debit =" + debit);
				ns.print("credit =" + credit);
			}
		} else {
			subtxlen = -1;
		}
	} // subtxlen > 0
	if (balance <= 0) {
		ns.tprint(" pas de gain possible");
	} else {
		ns.tprint(" gain max =" + balance);
	}

}