/* Config Enviroments that you can run the application
*  @PARAM
*  @TODO:
*  @Author
*  @Date
*/

const enviroments = {};

//config the staging (default) Enviroment
enviroments.staging = {
  'httpPort':3000,
  'httpsPort':3001,
  'Env_Name':'staging',
  'hasingSecret' : 'thisIsasecret',
  'maxChecks' : 5,
  'twilio' : {
    'accoutSid' : 'ACdd20421a0c371e591037350ae92f7d4d',
    'authToken' : 'c9597f6ec524ba9c7ef0c990e4777949',
    'fromPhone' : '+19738465559'
  },
  'globalTemplateData' : {
    'appName' : 'uptime Checker',
    'companyName' : 'no name',
    'yearCreated' : 2018,
    'baseUrl' : 'http://localhost:3000/'
  }
}

//config Production Enviroment
enviroments.production = {
  'httpPort' : 5000,
  'httpsPort':5001,
  'Env_Name': 'Production',
  'hasingSecret' : 'thisIsasecret',
  'maxChecks' : 5,
  'twilio' : {
    'accoutSid' : 'ACdd20421a0c371e591037350ae92f7d4d',
    'authToken' : 'c9597f6ec524ba9c7ef0c990e4777949',
    'fromPhone' : '+19738465559'
  }
  ,'globalTemplateData' : {
    'appName' : 'uptime Checker',
    'companyName' : 'no name',
    'yearCreated' : 2018,
    'baseUrl' : 'http://localhost:5000/'
  }
}

//desided Enviroment to run the application with
let currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//deside the enviroment is one of the above, if not export the default
let executeEnv = typeof(enviroments[currentEnv]) == 'object' ? enviroments[currentEnv] : enviroments.staging;

//export the Enviroment
module.exports = executeEnv;
