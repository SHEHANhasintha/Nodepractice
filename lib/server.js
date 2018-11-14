/*
 * This is the server file for API
 * @PARAM
 * @// TODO:
 * @Author : Shehan Hasintha
 * @Date : 1:47 AM : Wed/26/2018
 */


 //Dependencies
 const http = require("http");
 const https = require("https");
 const url = require("url");
 const stringDecoder = require("string_decoder").StringDecoder;
 const config = require('./config');
 const fs = require('fs');
 const handlers = require('./handlers');
 const helper = require('./helpers');
 const path = require('path');

const server = {};

//init function
server.init = function(){
  //server is listening to port 3000
  server.httpServer.listen(config.httpPort,function(){
    console.log('\x1b[34m%s\x1b[0m',`server is now listening to port',${config.httpPort},running enviroment:,${config.Env_Name}`);
  });

  //server is listening to port 5000
  server.httpsServer.listen(config.httpsPort,function(){
    console.log('\x1b[35m%s\x1b[0m',`server is now listening to port,${config.httpsPort},running enviroment:,${config.Env_Name}`);
  });
}


 //server should respond with a string
server.httpServer = http.createServer(function(req,res){
   server.serverFunctionality(req,res);
 });





 server.sslSecurity = {
   'key':fs.readFileSync(path.join('./https/key.pem')),
   'cert':fs.readFileSync(path.join('./https/cert.pem'))
 }

 //server should respond with a string
server.httpsServer = https.createServer(server.sslSecurity,function(req,res){
   server.serverFunctionality(req,res);
 });



 //current server function
 server.serverFunctionality =  function(req,res){
   //parse the url
   let urlParsed = url.parse(req.url,true);

   //get the path from the parsed url
   let path = urlParsed.pathname;

   //trim the parsed url
   let trimedPath = path.replace(/^\/+|\/+$/g,'');

   //get the method requested
   let method = req.method.toLowerCase();

   // get headers as an object
   let headers = req.headers;

   //get the query string
   let queryString = urlParsed.query;

   //get the stringming data
   let decoder = new stringDecoder('utf-8');
   let buffer = ''
   req.on('data',function(data){
     buffer += decoder.write(data);
   });

   req.on('end', function(data){
     buffer += decoder.end();

     let requestHandle = typeof(server.router[trimedPath]) !== 'undefined' ? server.router[trimedPath] : handlers.notFound;
     requestHandle = trimedPath.indexOf('public/') > -1 ? handlers.public : requestHandle;
     //console.log(queryString.phoneNumber)
     data = {
       'trimedPath' : trimedPath,
       'method' : method,
       'headers' : headers,
       'queryString' : queryString,
       'payload' : helper.jsonParser(buffer)
     }


     requestHandle(data,function(statusCode,payload,contentType){
       //determine the type of the content
       contentType = typeof(contentType) == 'string' ? contentType : 'json';

       statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

       if (contentType == 'json'){
         res.setHeader('Content-Type','application/json');
         payload = typeof(payload) == 'object' ? payload : {};
         payloadString = JSON.stringify(payload);
       }
       if (contentType == 'html'){
         res.setHeader('Content-Type','text/html');
         payloadString = typeof(payload) == 'string' ? payload : '';
       }
       if (contentType == 'jpeg'){
         res.setHeader('Content-Type','image/jpeg');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       if (contentType == 'png'){
         res.setHeader('Content-Type','image/png');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       if (contentType == 'ico'){
         res.setHeader('Content-Type','image/ico');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       if (contentType == 'css'){
         res.setHeader('Content-Type','text/css');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       if (contentType == 'favicon'){
         res.setHeader('Content-Type','image/x-icon');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       if (contentType == 'plain'){
         res.setHeader('Content-Type','plain');
         payloadString = typeof(payload) !== 'undefined' ? payload : '';
       }
       res.writeHead(statusCode);
       res.end(payloadString);
       //console.log('respond: ',statusCode,'\n payload :', payloadString);
       if (statusCode==200){
         console.log('\x1b[33m%s\x1b[0m',`${method} /${path} :${statusCode}`);
       }else{
         console.log('\x1b[33m%s\x1b[0m',`${method} /${path} :${statusCode}`);
       }
     });

   });

 }

 server.router = {
   '' : handlers.index,
   'account/create' : handlers.accountCreate,
   'account/edit' : handlers.accountEdit,
   'account/delete' : handlers.accountDeleted,
   'session/create' : handlers.sessionCreate,
   'session/deleted' : handlers.sessionDeleted,
   'checks/create' : handlers.checkCreate,
   'checks/edit' : handlers.checkEdit,
   'checks/delete' : handlers.checkDelete,
   'checks/all' : handlers.checksAll,
   'ping': handlers.ping,
   'api/users' : handlers._users,
   'api/tokens': handlers._tokens,
   'api/checks' : handlers._checks,
   'favicon.ico' : handlers.favicon,
   'public' : handlers.public
 };

module.exports = server;
