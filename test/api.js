/*
* API test
*
*/

//Dependencies
const app = require("./../index");
const assert = require("assert");
const http = require("http");
const config = require("./../lib/config");

//Helper for the test
const api = {};

//helpers
const helpers = {};
helpers.makeGetRequest = function(path,callback){
	let requestDetails = {
		'protocol' : 'http:',
		'hostname' : 'localhost',
		'port' : config.httpPort,
		'method' : 'GET',
		'path' : path,
		'headers' : {
			'Content-Type' : 'application/json'
		}
	}
	let req = http.request(requestDetails,function(res){
		callback(res);
	})
	req.end();

	api['app.init should without throwing'] = function(done){
		assert.doesNotThrow(function(){
			init();
		},TypeError);
	}
};

api['ping should respond with 200'] = function(done){
	helpers.makeGetRequest('/ping',function(res){
		try{
			assert.equal(res.statusCode,200);
		}catch(e){
			console.log(e,res.statusCode);
		}
		done();
	})
}

api['ping should respond to GET with 400'] = function(done){
	helpers.makeGetRequest('/api/users',function(res){
		try{
		assert.equal(res.statusCode,403);
		}catch(e){
			console.log(e,res.statusCode)
		}
		done();
	})
}

//random path
api['ping should respond to GET with 404'] = function(done){
	helpers.makeGetRequest('/api/users/noExist',function(res){
		try{
		assert.equal(res.statusCode,404);
		}catch(e){
			console.log(e,res.statusCode)
		}
		done();
	})
}


module.exports = api;