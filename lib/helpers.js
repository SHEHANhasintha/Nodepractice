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
const fs = require('fs');
const path = require('path')

const helpers = {};

helpers.getANumber = function(){
  return 1;
}

helpers.getTemplate = async function(templateName,templateData,callback){
  return await new Promise(function(resolve,reject){
    templateName = typeof(templateName) == 'string' ? templateName : false;
    if (templateName){
      let template = path.join(__dirname,'/../templates/')
      fs.readFile(template +  templateName + '.html','utf8',function(err,templateRead){
        if (!err && templateRead){
          let bakedString = helpers.interpolation(templateRead,templateData)
          resolve(callback(false,bakedString))
        }else{
          reject(callback('template file not exist'))
        }
      })
    }else{
      reject(callback('invalid data entry'))
    }
  })
}

helpers.universaltemplate = function(str,data,callback){
  //get the _header,index and _footer then combin them together into a one string
  let finalString = '';
  //call on getTemplate function for _header
  helpers.getTemplate('_header',data,function(err,headerData){
    if (!err && headerData){
      //call on getTemplate function for _footer
      helpers.getTemplate('_footer',data,function(err,footerData){
        if (!err && footerData){
          //combin thenm into a one string
          finalString += headerData + str + footerData
          //send the manipulated string into the replacing function
          //helpers.interpolation(finalString,data,function(err,backString){
              callback(false,finalString)
        }else{
          callback('failed to read the _footer view')
        }
    })
  }else{
    callback('failed to read the _header view')
  }
})
}

helpers.interpolation = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : false;
  data = typeof(data) == 'object' && data !== null ? data : false;
  if (str && data){
    for (let tempDataKey in config.globalTemplateData){
      if (config.globalTemplateData.hasOwnProperty(tempDataKey)){
        data['global.' + tempDataKey] = config.globalTemplateData[tempDataKey]
      }
    }
    for (let tempDataKey in data){
      if (data.hasOwnProperty(tempDataKey) && typeof(tempDataKey) == 'string'){
        let replace = data[tempDataKey];
        let find = '{' + tempDataKey + '}';
        str = str.replace(find,replace)
      }
    }
    return str
}else{
  return 'invalid data entry'
}
}

helpers.getStaticAssert = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if (fileName){
    let baseDir = path.join(__dirname,'/../public/')
    console.log(baseDir + fileName)
    fs.readFile(baseDir + fileName,function(err,readData){
      if (!err && readData){
        callback(false,readData);
      }else{
        callback('file is not exist')
      }
    })
  }else{
    callback('invalid file Name')
  }
}

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
