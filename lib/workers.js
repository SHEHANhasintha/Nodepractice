/*
 * This is the server file for API
 * @PARAM
 * @// TODO:
 * @Author : Shehan Hasintha
 * @Date : 1:47 AM : Wed/26/2018
 */

//// NOTE: Basic idea of this is that to run the checks created for the user.

//import nessary libraries
  const dataLib = require('./data') ;
  const http  = require('http');
  const https  = require('https');
  const helpers = require('./helpers');
  const url = require('url');
  const fs = require('fs');
  const path = require('path');
  const logs = require('./logs');
  const util = require('util');
  const debug = util.debuglog('workers');

const workers = {}

 // Init
workers.init = function(){
  workers.gatherChecks('checks');
  workers.rotateLogs();
  workers.loop();
  workers.loopRotateLogs();
  console.log('\x1b[33m%s\x1b[0m','Background workers are running');
}

// gather checks
workers.gatherChecks = function(fileName){


  dataLib.list('checks',function(err,file){
    if (!err && file){
       file.forEach(async function(selelctedFileName){


        dataLib.read('checks',selelctedFileName, function(err,redData){
          if (!err && redData){

             workers.validateChecks(redData, function(sent){
                debug('sent',sent)
            });
          }else{
            debug('selected file id not exist')
          }
        })

      });
    }else{
      debug(err,'could not find the folder');
    }
  })

}

// validate
workers.validateChecks = function(orgData,callback){
  //validate each one
  let originalData = typeof(orgData) == 'object' && orgData !== null ? orgData : {};
  originalData.id = typeof(orgData.id) == 'string' && orgData.id.length > 0 ? orgData.id : false;
  originalData.phone = typeof(parseInt(orgData.phoneNumber)) == 'number' &&  orgData.phoneNumber.toString().trim().length == 11 ? parseInt(orgData.phoneNumber) : false;
  originalData.protocol = typeof(orgData.protocall) == 'string' && ['http','https'].indexOf(orgData.protocall) > -1 ? orgData.protocall : false;
  originalData.successCodes = typeof(orgData.successCodes) == 'object' && orgData.successCodes instanceof Array ? orgData.successCodes : false;
  originalData.url = typeof(orgData.url) == 'string' && orgData.url.length > 0 ? orgData.url : false;
  originalData.method = typeof(orgData.method) == 'string' && ['get','post','put','delete'].indexOf(orgData.method) > -1 ? orgData.method : false;
  originalData.timeoutseconds = typeof(parseInt(orgData.timeoutseconds)) == 'number' && parseInt(orgData.timeoutseconds) < 5 && parseInt(orgData.timeoutseconds) > 0 ? parseInt(orgData.timeoutseconds) : false;

  //set the keys workers may not set (if the workers have never seen them before)
  originalData.state = typeof(orgData.state) == 'string' && ['up','down'].indexOf(orgData.state) > -1 ? originalData.state : false;
  originalData.lastCheck  =  typeof(orgData.lastCheck) == 'number' ? true : false;
  //if those right
  if (originalData.id && originalData.phone && originalData.protocol && originalData.successCodes && originalData.url && originalData.method && originalData.timeoutseconds){

    workers.perfomCheck(originalData,function(sent){
      callback(sent)
    });
  }else{
    debug('invalid data')
  }

}

 // loop
workers.loop = function(){
  setInterval(function(){
    workers.gatherChecks('checks')
  },1000 * 5)
}


 // perfom checks
workers.perfomCheck = function(originalData,callback){
  //check outcome
  let checkOutCome = {
    'error' : false,
    'responceCode' : false
  }

  //out come definition
  let outcomeSent = false;

  //parse data
  let parseUrl = url.parse(originalData.protocol+'://'+originalData.url,true)

  //settle data to send
  let reqData = {
    'protocol' : originalData.protocol + ':',
    'hostname' : parseUrl.hostname,
    'url' : originalData.url,
    'method' : originalData.method.toUpperCase(),
    'path' : parseUrl.path,
    'timeout' : originalData.timeoutseconds * 1000
  }

  //request method
  let _requestMethod = originalData.method == 'http' ? http : https;
  let req = _requestMethod.request(reqData,function(res){
    let status = res.statusCode;
    checkOutCome.responceCode = status;
    if (!outcomeSent){
      workers.processCheckOutCome(originalData,checkOutCome,function(sent,err){
        outcomeSent = sent;
        callback(sent)
      });
    }
  })

  req.on('error',function(e){
    debug('error')
    checkOutCome.error = {
      'error' : true,
      'value' : e
    };
    debug(outcomeSent,originalData.id)
    if (!outcomeSent){
      workers.processCheckOutCome(originalData,checkOutCome,function(sent,err){
        outcomeSent = sent;
        callback(sent)
      });
    }
  })

  req.on('timeout',function(time){
    debug('timeout')
    checkOutCome.error = {
      'error' : true,
      'value' : e
    }
    if (!outcomeSent){
      workers.processCheckOutCome(originalData,checkOutCome,function(sent,err){
        outcomeSent = sent;
        callback(sent)
      });
    }
  })
  req.end();

}

workers.processCheckOutCome = function(originalData,checkOutCome,callback){
  //Deside if the check is cnsidered up or down
  let state =  (!checkOutCome.error) && checkOutCome.responceCode && originalData.successCodes.indexOf(checkOutCome.responceCode) > -1 ? 'up' : 'down';

  //deside if an alert is warnted
  let alertWarrnted = originalData.lastCheck && originalData.state != state ? true : false;
  let newCheckData = originalData;
  newCheckData.state = state;
  newCheckData.lastCheck = Date.now();

  workers.logFile(originalData,checkOutCome,newCheckData.state,alertWarrnted,newCheckData.lastCheck)


  dataLib.update('checks',newCheckData.id,newCheckData,function(outcomeSent,err){
    if (!err){
      if (alertWarrnted){
        callback(true,newCheckData.id)
        //alert user the check data
        workers.alertUserStatusChange(newCheckData);
      }else{
        callback(true,'check has not been changed')
      }
    }else{
      callback(true,'error occured: update')
    }
  })

}

// Alert the user as to chenge in their check status
workers.alertUserStatusChange = function(newCheckData){
  let msg = newCheckData.method+ '- ' + newCheckData.protocol+ '://' + newCheckData.url+ '  ' + newCheckData.state;
  helpers.twilioSMS('0772802182',msg,function(err){
    if(!err){
      debug('success')
    }else{
      debug('user alert: sending fail ')
    }
  })
}

//rotate Logs per 24 hours
workers.loopRotateLogs = function(){
  setInterval(function(){
    workers.rotateLogs();
  }, 1000 * 3600 * 24);
}

workers.logFile = function(originalCheckData,checkOutCome,state,alertWarrnted,timeofcheck){
  //Primary goal: append into the file already exist or create a file and write into it
  //call flle appender inside the logs.js

  let DataString = {
    'check' : originalCheckData,
    'checkOutCome' : checkOutCome,
    'state' : state,
    'alertWarrnted' : alertWarrnted,
    'timeofcheck' : timeofcheck
  }

  let string = JSON.stringify(DataString)
  let fileName = originalCheckData.id;

  // TODO: eneble the follwing consologs after done with the debugging
  logs.appendString(fileName,string,function(err){
    if (!err){
      debug(false)
    }else{
      debug(err)
    }
  })
}


//rotateLogs
workers.rotateLogs = function(){
  //call listing function in the logs.js file(callback: listed names of files; from: .logs)
  logs.listing('.logs',function(err,files){
    if(!err && files){
      //read all the file one by one(for Each) callback: string
      files.forEach(function(currentRead){
            //compress the string
            logs.compress(currentRead,function(err){
              if (!err){
                //write into a file extention: .gz .base64(encoding)
                logs.truncate(currentRead,function(err){
                  if (!err){
                    debug('error occured: ',err)
                  }else{
                    debug(false)
                }
            })
          }else{
              debug('error occured: reading log files to log activities');
          }
        })
})
}else{
  debug('error occured: listing log files to log activities')

}
})
}

module.exports = workers;


//You've been matched!
//A fellow engineer with a similar practicing profile will be waiting to meet you for a live interview session on Saturday, October 6th, 10:30 pm
//Please arrive on t
