/*
* All the unit tests are included in here
*
*
*/

let helpers = require('./../lib/helpers');
let assert = require('assert');
let logs = require('./../lib/logs');


const unit = {};

//Assert tha the get number returning a number 
unit['helpers.getANumber should return a number'] = function(done){
	let value = helpers.getANumber();
	assert.equal(typeof(value),'number');
	done();
}

//Assert tha the get number returning a number 
unit['helpers.getANumber should return 1'] = function(done){
	let value = helpers.getANumber();
	assert.equal(value,1);
	done();
}

//Assert tha the get number returning a number 
unit['helpers.getANumber should return 2'] = function(done){
	let value = helpers.getANumber();
	assert.equal(value,2);
	done();
}

unit["list.logs should callback false an array of log names"] = function(done){
	logFile.listing('logs',function(err,logFileNames){
		assert.equal(err,false);
		assert.ok(logFileNames instanceof Array);
		assert.ok(logFileNames.length > 1);
		done();
	})
}

//logs truncate sholud not throw if the logId doesn't exist
unit["logs truncate sholud not throw if the logId doesn't exist"] = function(done){
	assert.doesNotThrow(function(){
		logs.truncate('I do not exist',function(err){
			assert.ok(err);
			done();
		})
	},TypeError)
}

module.exports = unit;