# bitburner scripts - toolkit
*scripts for the game https://bitburner-official.github.io*

## open source
I have prepared my own scripts, but also derivated some scripts from the official examples provided by bitburner.
You can safely take a copy of my scripts and update them for your need, they are free of charges.

## how to start
Once you have reach the level where you own the Singularity API, you can use the script initialProgramLoad.js at each restart after augmentations installations. Before you own the API, you must procede manually with:
1. nuke joesguns
2. run scripts/discover-network.js

## scripts per level of usage
from beginners to high level users, the scripts are using some API which cannot work before you reach the level where you can gain the API.

WARNING! I have organized my scripts in a folder named 'scripts', all scripts refering external scripts are expecting to find scripts in this folder on each host.

### basic-hack.js
largely inspired by the official script, it's the script copied on all servers to gain money and hack experience.
This script will generate money by hacking a target server.

	USAGE: run scripts/basic-hack.js SERVER_NAME
	Example:
        	> run scripts/basic-hack.js n00dles

*this scripts uses only APIs available from the beginning*

### discover-network.js 
this script searches for servers to deploy hack script if server is eligible. Eligibility is based on the number of ports remaining to crack.

	USAGE: run scripts/discover-nerwork.js [{SERVER_NAME} [{FULL|STD} [SCRIPT]]] 
	Examples: (default is FULL)
		> run scripts/discover-nerwork.js n00dles
		> run scripts/discover-nerwork.js n00dles {FULL|STD}
		> run scripts/discover-nerwork.js n00dles {FULL|STD} /scripts/basic-hack.js

*this scripts uses only APIs available from the beginning*

### custom-stats.js
this script enriches the overview panel with 3 lines:
Scr(ipts) : total money earned by all active scripts per second
Scr(ipts) : total hack experience points earned by all active scripts per second
Prod      : total money earned by all hacknet nodes per second

*this scripts uses only APIs available from the beginning*

### deleteServer.js
This script will delete the personal server designed. It can delete only servers created by the user.

	USAGE: run scripts/deleteServer.js {SERVER_NAME
	Example:
		> run scripts/deleteServer.js pserv-1

*this scripts uses only APIs available from the beginning*

### deploy.js
deploy a script on a server with maximum threads with available RAM
   use cases :
	new server , use max RAM for the script
	running server, use remaining RAM if any 
   - this script do not kill process before launching threads
   - use redeploy.js to kill all running process before launching new threads

	Usage: run scripts/deploy.js {HOST} {SCRIPT} {ARGUMENTS}
	Example:
		> run scripts/deploy.js n00dles basic_hack.js foodnstuff

*this scripts uses only APIs available from the beginning*

### filesCollector.js
This script read the name of the server from port 1 and then retrieve a copy of files from the defined server.
It doesn't retrieve our own /scripts/basic-hack.js and no contracts (.cct). 
it is mainly used to retrieve the text files.
it ends when no servername are available any more on port 1.

*this scripts uses only APIs available from the beginning*

### findPrimeFactor.js
This script list all prime factors of a number. support contract solving.
it searches largest prime factor of a number.

	USAGE: run ${ns.getScriptName()} {number}
	Examples:
		> run ${ns.getScriptName()} 554750073

*this scripts uses only APIs available from the beginning*

### find_Coding_contract.js
This script helps you find an unsolved coding contract.
	
 	Usage: run scripts/find_Coding_contract.js
	Example:
		> run scripts/find_Coding_contract.js

*this scripts uses only APIs available from the beginning*

### find_server.js
This script helps you find a server on the network and shows you the path to get to it.
	
 	Usage: run scripts/find_server.js {SERVER}
	Example:
		> run scripts/find_server.js n00dles

*this scripts uses only APIs available from the beginning*

### hackerDashboard.js
this script show a list (dahsboard) of server already hacked with memory usage and target of hack 

	+----------------------+-------------------------+----------------------------------------+---------------------+
	| open server  (#ps)   | used/max RAM (%)        |[target] #Thrds                         | script	        |
	+----------------------+-------------------------+----------------------------------------+---------------------+
	| ${host} (${pscount}) | ${us}/${mx}GB (${%Ram}) | [${process.args}] #${process.threads}  | ${process.filename} |
 	+----------------------+-------------------------+----------------------------------------+---------------------+
				
	Usage: run scripts/hackerDashboard.js
	Example:
		> run scripts/hackerDashboard.js

*this scripts uses only APIs available from the beginning*

### hackerServers.js
This script lists all servers on which you can run scripts. Slightly different from hackerDashboard.

	Usage: run scripts/hackerServers.js
	Example:
		> run scripts/hackerServers.js

*this scripts uses only APIs available from the beginning*
  
### infoPlayer.js

### infoServer.js

### initialProcessLoading.js

**this script requires Singularity API (lvl-4)**

### initialProgramLoading.js

**this script requires Singularity API (lvl-4)**

### installBackdoor.js

**this script requires Singularity API (lvl-4)**

### joinFaction.js

**this script requires Singularity API (lvl-4)**

### libscan.js
Libary of functions
 functions :
	getTimestamp () : return timestamp dd/mm/yyyy hh:mn
	list_servers (ns) : return an array of all the servers in the network
 
*this scripts uses only APIs available from the beginning*

### list_servers.js

*this scripts uses only APIs available from the beginning*

### moneyServers.js

### numeral.min.js

### openServers.js

### purchase-hacknetNodes.js

### purchase-programs.js

### purchase-servers.js

### reTarget.js

### redeploy.js

### rtop.js

### spendhashes.js

**this script requires Singularity API (lvl-4)**

### stockExtern.js

### testEnums.js

### tradeStock.js

### upgradeHome.js

### upgradeSkills.js

### work4Companies.js

**this script requires Singularity API (lvl-4)**

### work4Factions.js

**this script requires Singularity API (lvl-4)**

### work4bladerunner.js

**this script requires Bladeburner API**

### SolverTrader.js
This script is used to resolve contracts of type trader. this is a tookit, it has to be updated manually with the context of the contract you want to solve.
		
	Usage: run scripts/SolverTrader.js {array} [{max tx}]
	Example:
		> run scripts/SolverTrader.js "[146, 88, 181]"
		> run scripts/SolverTrader.js "[146, 88, 181] 6"

*this scripts uses only APIs available from the beginning*

## Singularity API required (Lvl-4)
### apply4jobs.js
This script automatically applies for job when a job becomes available in a city.
It is supposed to run in background on home server.

**this script requires Singularity API (Lvl-4)**

### backdoorServer.js
This script automatically installs backdoor on servers when nuke and hack level is sufficient.
It is supposed to run in background on home server.


### connect_server.js 
This script allows you to connect to any server by hostname. it shows the path used to connect.
	Usage: run scripts/connect_server.js {SERVER}
	Example:
		> run scripts/connect_server.js n00dles
  
**this script requires Singularity API (Lvl-4)**
  
### createProgram.js
This script creates the missing programs, until all are built.
it is supposed to run in background on home server.
in its current version it is limited to the programs need to crack ports. it could be extended to others.
  
**this script requires Singularity API (Lvl-4)**

### deployBackdoors.js
This script helps you deploy backdoor to any server on the network.

	Usage: run ${ns.getScriptName()}
	Example:
		> run ${ns.getScriptName()}
		
**this script requires Singularity API (Lvl-4)**
