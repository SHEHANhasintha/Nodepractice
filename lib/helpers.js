/*
* @PARAM
* @// TODO:
* @Author
* @Date
*/

const crypto = require('crypto');
const config = require('./config');
const queryString = require('querystring')
const https = require('https')
var helpers = {};

helpers.hash = function(password){
  if (typeof(password) == 'string' && password.length > 0) {
    let hashing = crypto.createHmac('sha256',config.hasingSecret).update(password).digest('hex');
    return hashing;
  }else{
    return false;
  }
}

helpers.jsonParser = function(string){
    try {
      let obj = JSON.parse(string);
      return obj;
    } catch (e) {
      //console.log(typeof(string))
      return {};
    }
}

helpers.randomString = function(charLen){
  let arr = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  for (i=0; i<charLen; i++){
    str += arr[Math.floor(Math.random()* arr.length)]
  }
  return str;
}

helpers.extendTime = function(hours){
  let date = Date.now() + 1000 * 60 * 60 * hours;
  return date;
}

helpers.stringParse = function(string){
  try{
    let parsedString = parseInt(string);
    return parsedString;
  }catch(e){
    return string;
  }
}

helpers.twilioSMS = function(mobileNumber,str,callback){
  let message = typeof(str) == 'string' && str.length < 1600 ? str : false;
  let mobile = typeof(mobileNumber) == 'string' ? mobileNumber : false;

  if (message && mobile){
    //Configure the request payload
      let payload = {
        'From': config.twilio.fromPhone,
        'To' : '+94' + mobile,
        'Body' : message
      }

    //Stringify the payload
    var stringPayload = queryString.stringify(payload);

    //Configure the request details
      let requestDetails = {
        'method' : 'POST',
        'protocall' : 'https:',
        'hostname' : 'api.twilio.com',
        'path' : '/2010-04-01/Accounts/' + config.twilio.accoutSid + '/Messages.json',
        'auth' : config.twilio.accoutSid+':'+config.twilio.authToken,
        'headers' : {
            'Content-type' : 'application/x-www-form-urlencoded',
            'Content-length' : Buffer.byteLength(stringPayload)
        }
      }
      //Instanciate the request object
      var req = https.request(requestDetails,function(res){
        //grab the status of the sent request
        var status = res.statusCode;

        //callback successfully if the request went throught
        if (status == 200 || status == 201){
          callback(false)
        }else{
          callback('statusCode returned was ' + status)
        }
      });

      //Bind to the error event
      req.on('error',function(e){
        callback(e);
      })

      //add the payload
      req.write(stringPayload);

      //end the request
      req.end();

  }else{
    callback('given parameters are invalid or missing')
  }
}

module.exports = helpers;
