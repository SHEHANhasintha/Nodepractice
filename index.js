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

const app = {};

//function to run server and worker
app.init = function(){
  server.init();
  workers.init();
}

app.init();

module.exports = app;
