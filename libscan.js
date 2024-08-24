/* library : libscan.js

 functions :
	getTimestamp () : return timestamp dd/mm/yyyy hh:mn
	list_servers (ns) : return an array of all the servers in the network
*/

export function getTimestamp() {
	const event = new Date();
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  
	return event.toLocaleDateString('fr-fr', options) + " " + event.toLocaleTimeString('fr-fr') + " - "; 
}

function scan(ns, parent, server, list) {
	const children = ns.scan(server);
	for (let child of children) {
		if (parent == child) {
			continue;
		}
		list.push(child);

		scan(ns, server, child, list);
	}
}

export function list_servers(ns) {
	const list = [];
	scan(ns, '', 'home', list);
	return list;
}