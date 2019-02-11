/*
* purpose: write a program where does the tool. 
* CLI related tools
*
*
*/
const util = require('util'); 
const readline = require('readline');
const events = require('events');
const debug = util.debuglog('cli');
const os  = require('os');
const v8 = require('v8');

const _data = require('./data');
const _helpers = require('./helpers');
const _logs = require('./logs');
const cli = {}


//responders object
cli.responders = {};

class _events extends events{};

const e = new _events();

//inputHandlers
e.on("man",function(str){
	cli.responders.help();
})

e.on("help",function(str){
	cli.responders.help();
})

e.on("exit",function(str){
	console.log("exiting the program")
	cli.responders.exit();
})

e.on("stats",function(str){
	cli.responders.stats();
})
e.on("list users",function(str){
	console.log('treterterter tr')
	cli.responders.listUsers();
})
e.on("more user info",function(str){
	cli.responders.moreUserInfo(str);
})
e.on("listchecks",function(str){
	cli.responders.listChecks(str);
})
e.on("more check info",function(str){
	cli.responders.moreCheckInfo(str);
})
e.on("list logs",function(str){
	cli.responders.listLogs(str);
})
e.on("more log info",function(str){
	cli.responders.moreLogInfo(str);
})

//man/help
cli.responders.help = function(){
	let commands = {
		'exit': 'exit the CLI program and leave the rest of the application',
		'man' : 'ask for help(AKA:- manual)(show the help page)',
		'help': 'ask for help(show the help page)(Alias of "man" command)',
		'stats': 'get statistics of undeline operating system and resource utilisaction',
		'list users': 'list all the users(undeleted) users in the system',
		'more user info --(userId)': 'show details of a specified user',
		'list checks --up --down': 'show a list of all the active checks in the system',
		'more check info --(checkId)': 'show details of a specified check',
		'list logs': 'show a list of all the logs available (compressed and uncompressed)',
		'more log info --(logId)': 'show the details of a log file'
	}

	//show a header that drown all across the screen 
	cli.horizantalLine();
	cli.centered('CLI help');
	cli.horizantalLine();
	cli.verticalLine(2);

	//show each command followed by its explanation in yellow and white respectively
	for (let key in commands){
		if (commands.hasOwnProperty(key)){
			let value = commands[key];
			let line = '\x1b[33m' + key + '\x1b[0m';
			let padding = 60 - line.length;
			for (let i=0;i<padding;i++){
				line += ' ';
			}
			line += value;
			console.log(line);
			cli.verticalSpace();
		}
	}
	cli.verticalSpace();

	//endd with anothoer vertical line
	cli.horizantalLine();
}

cli.verticalSpace = function(lines){
	lines = typeof(lines) == "number" && lines > 0 ? lines : 1;
	for (let i=0; i < lines;i++){
		console.log('');
	}
}

cli.horizantalLine = function(){
	//get the available screen size
	let lines = '';
	let width = process.stdout.columns;
	for (let i=0; i<width;i++){
		lines += '-';
	}
	console.log(lines);
}

cli.centered = function(str){
	str = typeof(str) == "string" && str.trim().length > 0 ? str : '';
	//get the available screen size
	let width = process.stdout.columns;
	let render = "";
	let centerPos = (Math.floor(width - str.length) / (2 * 15));
	for (let i=0; i< centerPos; i++){
		render += " ";
	}
	render += str;
	console.log(render);
}

cli.verticalLine = function(lines){
	lines = typeof(lines) == "string" ? lines : 0;
	for (let i=0; i< lines; i++){
		console.log("");
	}
}

//exit
cli.responders.exit = function(){
	process.exit(0);
}
//stats
cli.responders.stats = function(){
	let stats = {
		'Load Average' : os.loadavg().join(' '),
		'CPU Count' : os.cpus().length,
		'Free Memory' : os.freemem(),
		'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
		'Current Malloced Used' : v8.getHeapStatistics().peak_malloced_memory,
		'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
		'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
		'Uptime' : os.uptime() + ' seconds'
	}

	//show a header that drown all across the screen 
	cli.horizantalLine();
	cli.centered('SYSTEM STATISTICS');
	cli.horizantalLine();
	cli.verticalLine(2);

	//show each command followed by its explanation in yellow and white respectively
	for (let key in stats){
		if (stats.hasOwnProperty(key)){
			let value = stats[key];
			let line = '\x1b[33m' + key + '\x1b[0m';
			let padding = 60 - line.length;
			for (let i=0;i<padding;i++){
				line += ' ';
			}
			line += value;
			console.log(line);
			cli.verticalSpace();
		}
	}
	cli.verticalSpace();

	//endd with anothoer vertical line
	cli.horizantalLine();
}
//listUsers
cli.responders.listUsers = function(){
	_data.list('users',function(err,userdata){
		userdata.forEach(function(currData){
			_data.read('users',currData,function(err,fileData){
				cli.verticalSpace();
				delete fileData.password;
				console.log(fileData);
				cli.verticalSpace();
			})

		})
	})
}
//moreUserInfo
cli.responders.moreUserInfo = function(userId){
	
	userId = userId.split('--')
	console.log(userId,'uid')
	userId = typeof(userId[1]) == 'string' && userId[1].length > 0 ? userId[1].trim() : false;
	userId = userId.replace('(','');
	userId = userId.replace(')','');
	console.log(typeof(userId) == 'number',userId.length > 0,userId)
	if (userId){
		_data.read('users',userId,function(err,fileData){
			delete fileData.password;
			console.log(fileData)
		})
	}else{
		console.log("invalid userId")
	}
}
//listChecks
cli.responders.listLogs = function(logId){
	logId = typeof(logId) == 'string' && logId.length > 0 ? logId : false;
	if (logId){
		_logs.listing('logs',function(err,arrLogs){
			for (let i=0;i<arrLogs.length;i++){
				console.log(arrLogs[i]);
				cli.verticalSpace();
			}
		})
	}else{
		console.log('invalid data entry');
		cli.verticalSpace();
	}
}
//moreCheckInfo
cli.responders.moreCheckInfo = function(){
	console.log("you asked for moreCheckInfo!");
}
//listLogs
cli.responders.listChecks = function(logId){
	logId = logId.split('--');
	if (logId[1]){
	logid = logId[1].replace('(','');
	logid = logid.replace(')','');
	logid = typeof(logid) == 'string' && logid.length > 0 ? logid.trim() : false;
	if (logId){
		_data.read('checks',logid,function(err,logInfo){
			if (logInfo){
				if (logId[2]){
					logId = logId[2].replace('(','');
					logId = logId.replace(')','');
					logId = logId == 'up' ? 'up' : 'down';
					if (logId == 'up' && typeof(logInfo) == Array){
						for (let i=0; i<logInfo.length;i++){
							logInfo = (logInfo[i].state == 'down') ? logInfo.splice(i,i) : logInfo;
						}
					}
					if (logId == 'up' && typeof(logInfo) == Array){
						for (let i=0; i<logInfo.length;i++){
							logInfo = (logInfo[i].state == undefined) ? logInfo.splice(i,i) : logInfo;
						}
					}
					if (logId == 'down' && typeof(logInfo) == Array){
						for (let i=0; i<logInfo.length;i++){
							logInfo = (logInfo[i].state == 'up') ? logInfo.splice(i,i) : logInfo;
						}
					}

					if (logId == 'up' && typeof(logInfo) == 'object'){
						logInfo = (logInfo.state == 'down') ? '' : logInfo;
					}
					if (logId == 'up' && typeof(logInfo) == 'object'){
						logInfo = (logInfo.state == undefined) ? '' : logInfo;
					}
					if (logId == 'down' && typeof(logInfo) == 'object'){
						logInfo = (logInfo.state == 'up') ? '' : logInfo;
					}
					logInfo.state = logInfo.state == undefined || logInfo.state == 'down' ? 'down' : 'up';
					if (typeof(logInfo) == Array){
						for (let i=0; i< logInfo.length;i++){ 
						console.log(`${logInfo[i].id} ${logInfo[i].phoneNumber} ${logInfo[i].protocall}://${logInfo[i].url} ${logInfo[i].method} ${logInfo[i].state} ${logInfo[i].successCodes}`);
						}
					}
					if (typeof(logInfo) == 'object'){
						console.log(`${logInfo.id} ${logInfo.phoneNumber} ${logInfo.protocall}://${logInfo.url} ${logInfo.method} ${logInfo.state} ${logInfo.successCodes}`);
					}
					cli.verticalSpace();
				}else{
					logInfo.state = logInfo.state == undefined || logInfo.state == 'down' ? 'down' : 'up'; 
					for (let i=0; i< logInfo.length;i++){ 
					console.log(`${logInfo[i].id} ${logInfo[i].phoneNumber} ${logInfo[i].protocall}://${logInfo[i].url} ${logInfo[i].method} ${logInfo[i].state} ${logInfo[i].successCodes}`);
					}
					cli.verticalSpace();
				}
			}else{
				console.log('invalid information');
			}
		})
	}else{
		console.log('invalid input');
		cli.verticalSpace();
	}
}else{
	console.log('logId not defined')
	cli.verticalSpace();
}
}

//moreLogInfo
cli.responders.moreLogInfo = function(){
	console.log("you asked for moreLogInfo!");
}

cli.processInput = function(str){
	str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
	//only process when user write somthing to the console
	if (str){
		//codify the words are
		let uniqueStrings = [
			'man',
			'help',
			'exit',
			'stats',
			'list users',
			'more user info',
			'list checks',
			'more check info',
			'list logs',
			'more log info'
		];
		// go through possible emmit event when the match found
		let matchFound =false;
		let counter = 0;
		uniqueStrings.some(function(input){
			if (str.toLowerCase().indexOf(input) > -1){
				matchFound = true;
				e.emit(input,str);
				return true;
			}
		})

		//if no match is found tell the user to try again
		if (!matchFound){
			console.log("sorry try again!")
		}
	}
}

cli.init = function(){
	//send the start up message to the console
	console.log('\x1b[35m%s\x1b[0m',`CLI is now listening to input`);

	let _interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		promt: '>'
	})

	_interface.prompt();

	//handle each line that write
	_interface.on('line',function(str){
		//send to the input processor
		cli.processInput(str);
		//reinit the process afterwards
		_interface.prompt();
	})

	_interface.on('close',function(){
		//exit the process
		process.exit(0);
	})


}

module.exports = cli;