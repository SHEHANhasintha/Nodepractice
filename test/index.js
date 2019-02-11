/*
*
*	Test runner
*
*/

process.env.NODE_ENV="testing";

//Dependencies
let helpers = require('./../lib/helpers');
let assert = require('assert');
let unitTests = require('./unit');
let index = require('./../index');

index.init();

_app = {};

//Application logic for the test runner
_app.tests = {};

//container for the test
_app.tests.unit = unitTests;
_app.tests.api = require('./api');

/*
//Assert tha the get number returning a number 
_app.tests.unit['helpers.getANumber should return a number'] = function(done){
	let value = helpers.getANumber();
	assert.equal(typeof(value),'number');
	done();
}

//Assert tha the get number returning a number 
_app.tests.unit['helpers.getANumber should return 1'] = function(done){
	let value = helpers.getANumber();
	assert.equal(value,1);
	done();
}

//Assert tha the get number returning a number 
_app.tests.unit['helpers.getANumber should return 2'] = function(done){
	let value = helpers.getANumber();
	assert.equal(value,2);
	done();
}*/

//count all the tests
_app.countTests = function(){
	var counter = 0;
	for (let key in _app.tests){
		let subTests = _app.tests[key];
		if (_app.tests.hasOwnProperty(key)){
			for (let testName in subTests){
				if (subTests.hasOwnProperty(testName)){
					counter++;
				}
			}
		}
	}
	return counter;
}

//run all the tests, collecting the errors and successes
_app.runTests = function(){
	let errors = [];
	let successes = 0;
	let limit = _app.countTests();
	let counter = 0;
	for (let key in _app.tests){
		if (_app.tests.hasOwnProperty(key)){
			let subTests = _app.tests[key];
			for (let testName in subTests){
				if (subTests.hasOwnProperty(testName)){
					(function(){
						let tmpTestName = testName;
						let testValue = subTests[testName];
						//call the tests
						try{
							testValue(function(){
								//if it calls back without throwing, then it succeeded, so it in green
								console.log('\x1b[32m%s\x1b[0m',tmpTestName);
								counter++;
								successes++;
								if (counter == limit){
									_app.produceTestresult(limit,successes,errors);
								}
							});
						}catch(e){
							//if it thrown, then it failed, so capture the error thrown and log it in red
							errors.push({
								'name' : testName,
								'error' : e
							})
							console.log('\x1b[33m%s\x1b[0m',);
							counter++;
							if (counter == limit){
									_app.produceTestresult(limit,successes,errors);
							}
						}
					})();
				}
			}
		}
	}
}

//Produce a test outcome report
_app.produceTestresult = function(limit,successes,errors){
	console.log("\n-------------BEGIN TEST REPORT------------\N");
	console.log("Total Tests", limit);
	console.log("Pass ", successes);
	console.log("Fail", errors.length);
	console.log("")

	//if there are errors, print them in details
	if (errors.length > 0){
		console.log("--------------BEGIN ERROR LOG IN DETAILS-------------");
		console.log("");
		errors.forEach(function(testError){
			console.log('\x1b[31m%s\x1b[0m',testError.name);
			console.log(testError.error);
			console.log("");
		})
		console.log("")
		console.log("--------------END ERROR LOG IN DETAILS-------------");
	}
	console.log("")
	console.log("--------------END TEST REPORT-------------");
	process.exit(0);
}

//Run the test
_app.runTests();

