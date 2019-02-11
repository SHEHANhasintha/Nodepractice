/*
* This is the Primary file for API
* @PARAM
* @TODO
* @Author
* @Date
*/

//import the libraries
const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');

const app = {};

//function to run server and worker
app.init = function(){
  server.init();
  workers.init();

  //start the server in cli
  setTimeout(function(){
  	 cli.init();
  },50)
}

if (require.main === module){
app.init();
}
module.exports = app;
