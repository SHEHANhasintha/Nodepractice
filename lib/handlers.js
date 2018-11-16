/*
* @PARAM data,callback
* @// TODO:
* @Author : Shehan Hasintha
* @date : sun/sep-16/2018 => 09:04 PM
*/

const dataLib = require('./data');
const helper = require('./helpers');
const config = require('./config');

const handlers = {
  defaultTokenLength : 20
};

handlers.index =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'upTime - Monitoring -- made - simple',
      'head.description' : 'We offer free simple up time monitoring for HTTP/HTTPS for all kinds. if your site goes down we will inform you via sms',
      'head.title' : 'this is the title',
      'body.class' : 'index'
    }
    //read in the template as a string
     helper.getTemplate('index',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){

            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}


handlers.accountCreate =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'create an account',
      'head.description' : 'sign up is easy and only takes few seconds',
      'body.class' : 'accountCreate'
    }
    //read in the template as a string
     helper.getTemplate('accountCreate',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//create new session
handlers.sessionCreate =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'log in to your account',
      'head.description' : 'enter password and username to log in to your account',
      'body.class' : 'sessionCreate'
    }
    //read in the template as a string
     helper.getTemplate('sessionCreate',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//session has been deleted
handlers.sessionDeleted =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'logged out',
      'head.description' : 'you have been logged out your account',
      'body.class' : 'sessionDeleted'
    }
    //read in the template as a string
     helper.getTemplate('sessionDeleted',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//session has been deleted
handlers.checksEdit =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    }
    //read in the template as a string
     helper.getTemplate('checksEdit',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//Dashboard view all checks
handlers.checksList =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    }
    //read in the template as a string
     helper.getTemplate('checksList',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}
//edit your account
handlers.accountDeleted =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'Account Deleted',
      'body.description' : 'Your account has been deleted',
      'body.class' : 'accountDelete'
    }
    //read in the template as a string
     helper.getTemplate('accountDelete',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//edit your account
handlers.accountEdit =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'logged out',
      'body.class' : 'accountEdit'
    }
    //read in the template as a string
     helper.getTemplate('accountEdit',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}

//favicon
handlers.favicon = function(data,callback){
  //reject non get method request
  if ((data.method) == 'get'){

    //Read in the favicon's data
    helper.getStaticAssert('favicon.ico',function(err,data){
      if (!err && data){
        callback(200,data,'favicon')
      }else{
        callback(500)
      }
    })
  } else{
    callback(405)
  }
}

//static assets
handlers.public = function(data,callback){
  //reject any request that isn't get
  if ((data.method) == 'get'){
    //get the file name being requested
    let trimmedAssertName = data.trimedPath.replace('public/','').trim();
    if (trimmedAssertName.length > 0){
      //read in the assets data
      helper.getStaticAssert(trimmedAssertName,function(err,data){
        if (!err && data){
          //determine the content type default to plain text
          let contentType = 'plain';

          if (trimmedAssertName.indexOf('.css') > -1){
            contentType = 'css'
          }

          if (trimmedAssertName.indexOf('.png') > -1){
            contentType = 'png'
          }

          if (trimmedAssertName.indexOf('.jpg') > -1){
            contentType = 'jpg'
          }

          if (trimmedAssertName.indexOf('.ico') > -1){
            contentType = 'ico'
          }
          callback(200,data,contentType)
        }else{
          callback(400)
        }
      })
    }else{
      callback(400)
    }
  }else{
    callback(405)
  }
}



handlers.checksCreate =  function(data,callback){
  return new Promise(function(resolve,reject){

  //reject andy request where it is not the method get
  if (data.method == 'get'){
    // TODO: define what we need specially for index.html
    let templateData = {
      'head.title' : 'create a new check',
      'body.class' : 'checksCreate'
    }
    //read in the template as a string
     helper.getTemplate('checksCreate',templateData,function(err,str){
      if (!err && str){
        helper.universaltemplate(str,templateData,function(err,data){
          if (!err && data){
            resolve(callback(200,data,'html'))
          }else{
            reject(callback(500,undefined,'html'))
          }
        })
      }else{
        reject(callback(500,undefined,'html'))
      }
    })
  }else{
    reject(callback(400,'invalid method','html'))
  }
  })
}


handlers.checksAll = function(data,callback){
  callback(200);
}

handlers.ping = function(data,callback){
  callback(200);
}

handlers.notFound = function(data,callback){
  callback(404);
}

//create _users handler
handlers._users = function(data,callback){
  //check the method requested
  const availableMathods = ['get','post','put','delete'];
  if (availableMathods.indexOf(data.method) > -1){
    //send the requested method to the sub method
    handlers._users[data.method](data,callback)
  }else{
    callback(405);
  }
}

//sub method get
handlers._users.get =  function(data,callback){
  //console.log(data)
  //console.log(data)
  let phoneNumber = typeof(parseInt(data.queryString.phoneNumber)) == 'number' ? data.queryString.phoneNumber : false;
  let token = typeof(data.headers.token) == 'string' && data.headers.token.length == 20 ? data.headers.token : false;
      //read file
      if (phoneNumber && token){
        handlers._tokens.verifyTokens(token,phoneNumber,function(verified){
          if (verified){
            dataLib.read('users',phoneNumber,function(err,data){
              if (!err){
                delete data.password;
                callback(200,data);
              }else{
                callback(404,{'error' : 'entered data does not exist!'});
              }
            });
          }else{
            callback(403,{'error' : 'untrusted source'});
          }
        })
      }else{
        callback(403,{'error' : 'missing required field'})
      }
}

//sub method post
handlers._users.post =  function(data,callback){
  //validate data @PARAM: FirstName Lastname phoneNumber password
    firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    phoneNumber = typeof(parseInt(data.payload.phone)) == 'number' ? data.payload.phone : false;
    password = typeof(data.payload.password) == 'string' && data.payload.password.length > 5 ? data.payload.password : false;
    tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' ? true : false;

    //console.log(firstName,lastName,phoneNumber,data.payload.phone,password,tosAgreement)

        if (firstName && lastName && phoneNumber && password){
        //read the file if there is no user under the data, allow to create a new user
          // TODO: goto the file directry @PARAM: ./.data/users
           // prepare for read

              dataLib.read('users',phoneNumber,function(err,data){
                if(err){
                  //password hashing
                  let hashedPassword = helper.hash(password);
                  //create the input data JSON
                  data = {
                    'firstName' : firstName,
                    'lastName' : lastName,
                    'phoneNumber' : phoneNumber,
                    'password' : hashedPassword,
                    'tosAgreement' : tosAgreement
                  }
                  //cretate file and write into the file
                  dataLib.create('users',phoneNumber,data,function(err){
                    if(!err){
                      callback(200);
                    }else{
                      callback(500,{'error' : 'failed tocreate user'})
                    }
                  });
                }else{
                  callback(400,{'error':'could not create the new user'});
                }
              })
        }else{
          callback(400,{'error':'missing required field!: users'});
        }
}

//sub method uodate
handlers._users.put =  function(data,callback){
  //validate input _data

  let firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  let lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
  let phoneNumber = typeof(parseInt(data.payload.phoneNumber)) == 'number' ? data.payload.phoneNumber : false;
  let password = typeof(data.payload.password) == 'string' && data.payload.password.length > 5 ? data.payload.password : false;
  let newPassword = typeof(data.payload.newPassword) == 'string' && data.payload.newPassword.length > 5 ? data.payload.newPassword : false;
  //if required filed exist
//  let token = typeof(data.header.token) == 'string' && data.header.token.length == 20 ? data.header.token : false;

  let token = typeof(data.headers.token) == 'string' && data.headers.token.length == 20 ? data.headers.token : false;
  //console.log(data,data.payload.phoneNumber,firstName,lastName,phoneNumber,password,newPassword,token)
      if (phoneNumber && (firstName || lastName || newPassword) && token){
        handlers._tokens.verifyTokens(token,phoneNumber,function(verified){
          if (verified){
            //try read the file(err,data)

            dataLib.read('users',phoneNumber,function(err,data){
              //if (data.password == helper.hash(password)){
                if (!err){
                  //if it works
                  if (firstName){
                    data.firstName = firstName;
                  }
                  if (lastName){
                    data.lastName = lastName;
                  }
                  if (password){
                    data.password = helper.hash(newPassword);
                  }
                  //dataLib.update()
                  dataLib.update('users',phoneNumber,data,function(err){
                    callback(200);
                  })
                } else {
                  callback(500,'user is not exist');
                }
            //}else{
            //  callback(400,{'error':'password not mached'})
            //}
          });
        }else{
          callback(400,{'error' : 'untrusted source'});
        }
      })
    }else{
      callback(403,{'error' : 'invalid data entry'});
    }


}

//sub method delete
handlers._users.delete =  function(data,callback){
//  console.log(data)
  let token = typeof(data.headers.token) == 'string' && data.headers.token.length == 20 ? data.headers.token : false;
      if (token){


            dataLib.read('tokens',token,function(err,tokenData){
              if (!err && tokenData){
              let phoneNumber = tokenData.phoneNumber;
              //delete all the checks belongs to the user
              dataLib.read('users',phoneNumber,function(err,readData){

                readData = JSON.stringify(readData);
                console.log(readData)
                if (!err && readData.checks){

                    let delCheckQue = readData.checks;
                    delCheckQue.forEach(function(evCheck){
                      dataLib.delete('checks',evCheck,function(err){
                        if (!err){
                          console.log('successfully deleted: ' , evCheck)
                        }else{
                          console.log('error occured')
                        }
                      })
                    })

                  }
                  dataLib.delete('users',phoneNumber,function(err){
                    callback(200,{'success' : 'profile successfully deleted'})
                  })
                })
              }else{
                callback(400,{'error' : 'untrusted source'});
              }
            })



      }else{

        callback(403,{'error':"error occured: user doesn't exist"});
      }
}


//from now on do the token part
handlers._tokens = function(data,callback){
  //available methods
  const availableMethods = ['get','post','put','delete'];
  //validate the request
  let methodValidation = (availableMethods.indexOf(data.method) > -1) ? data.method : false;
  //get the method accoding to the request @PARAM data.method
  if (methodValidation) {
    handlers._tokens[data.method](data,callback);
  }else{
    callback(403,{'error':'unavailable method!'});
  }
}

//get request for @PARAM tokens
handlers._tokens.get = function(data,callback){
  //validate input data @PARAM[phoneNumber,password]
  let id = typeof(data.headers.token) == 'string' && data.headers.token ? data.headers.token : false;
  if (id) {
  //read tokens
    dataLib.read('tokens',id,function(err,data){
      //put out the info after deleating the passowrd
      if(!err){
        callback(200,data);
      }else{
        callback(500,{'error':'server fall: _tokens/get'})
      }
    })
  }else{
    callback(403,{'error':'token not exist'})
  }
}

//post request for @PARAM tokens
handlers._tokens.post = function(data,callback){
  console.log(data)
  //validate input data @PARAM[phoneNumber,password]
  let phoneNumber = typeof(parseInt(data.payload.phone)) == 'number'? data.payload.phone : false;
  let password = typeof(data.payload.password) == 'string' && (data.payload.password.length > 3) ? data.payload.password : false;
  //create token file for each login
  if (phoneNumber && password){
    dataLib.read('users',phoneNumber,function(err,recevedData){
      if(!err && recevedData){
        if (helper.hash(password) == recevedData.password){
          let token = helper.randomString(20);
          let expire = helper.extendTime(1);
          tokenData = {
            "phoneNumber": phoneNumber,
            "token" : token,
            "expireTime" : expire
          }
          dataLib.create('tokens',token,tokenData,function(){
            if (!err){
              delete tokenData.password;
              callback(200,tokenData);
            }else{
              callback(500,{'error':'server error'});
            }
          });
        }else{
          callback(400,{'error':'password is not mached!'})
        }
      }else{
        callback(400,{'error':"couldn't find the specified user"})
      }
    })
  }else{
    callback(403,{'error':'missing input field' });
  }
}

//update request for @PARAM tokens
//required data @PARAM: phoneNumber,expand,tokenId
//optional data: none
handlers._tokens.put = function(data,callback){
  //validate data @param: phoneNumber, tokenId and Date.now();
  let extend = typeof(data.payload.extend) == 'boolean' ? data.payload.extend : false;
  let id = typeof(data.headers.token) == 'string' && data.headers.token.length == handlers.defaultTokenLength ? data.headers.token : false;
  console.log(data)
  //read the user
  if (extend && id){
    //if it is then expand the expra timeout
    dataLib.read('tokens',id,function(err,data){
      if (!err && data){
        //check if the expra date is higher than the Date.now();
        if (data.expireTime > Date.now()){
          data.expireTime = helper.extendTime(1);
          dataLib.update('tokens',id,data,function(err){
            if (!err){
              callback(200,{'id':data.token})
            }else{
              callback(500,{'error' : 'server error: token update'})
            }
          })
        }else{
          callback(403,{'error':'token is expired!'})
        }
      }else{
        callback(403,{'error' : 'token not exist'})
      }
    })
  }else{
    callback(400,{'error' : 'invalid data entry: tokens'})
  }
}

//delete request for @PARAM tokens
handlers._tokens.delete = function(data,callback){
  //console.log(data)
  let id = typeof(data.queryString.id) == 'string' && data.queryString.id.length == handlers.defaultTokenLength ? data.queryString.id : false;
  //delete the token
  if (id){
    dataLib.delete('tokens',id,function(err){
      if (!err){
        callback(200);
      }else{
        callback(500,{'error' : 'server error: tokens delete'})
      }
    })
  }
}

//verify if the users id and phone is belongs to the real user
handlers._tokens.verifyTokens = function(id,phone,callback){
  dataLib.read('tokens',id,function(err,data){
    if(!err && data){
      if (data.expireTime > Date.now() && data.phoneNumber == phone){
        callback(true);
      }else{
        callback(false);
      }
    }else{
      callback(403,{'error':'token does not exist'});
    }
  });
}

//_service _checks
// NOTE: checks are backly an automated process where you can check weather a URL is working(up an running) or not.
//@param: data
// NOTE: we have the requested method inside the data stream comes in.

handlers._checks = function(data,callback){

  let availableMethods = ['get','post','put','delete']
  //check the requested method and send off to the correct method
  if (typeof(data.method) == 'string' && availableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  }else{
    callback(405,{'error' : 'unavailable method'})
  }
}

// NOTE: this method is going to create some checks where you can create some tasks to do
//@PARAM: protocall, successCodes, url, methods, timeoutseconds
//@optionalData: none

handlers._checks.post = function(data,callback){
  console.log(data)
  //validation checks
  let protocall = typeof(data.payload.protocall) == 'string' && ['http','https'].indexOf(data.payload.protocall) > -1 ? data.payload.protocall : false;
  let successCodes = data.payload.successCodes instanceof Array && typeof(data.payload.successCodes) == 'object' ? data.payload.successCodes : false;
  let url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url : false;
  let method = typeof(data.payload.Method) == 'string' && data.payload.Method.length && data.payload.Method.indexOf(data.payload.Method) > -1 ? data.payload.Method : false;
  let timeoutseconds = typeof(parseInt(data.payload.timeoutseconds)) == 'number' ? data.payload.timeoutseconds : false;

  console.log(protocall,successCodes,url,method,timeoutseconds)
  //if all the parameters are valid
  if (protocall && successCodes && url && method && timeoutseconds){
    let token  = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    if (token){
        console.log('gggggggggggggggggggggggg')
      dataLib.read('tokens',token,function(err,tokenData){
        if(!err && tokenData){
          let phoneNumber = tokenData.phoneNumber;
          //read the users data from the folder
          dataLib.read('users',phoneNumber,function(err,userData){
            if (!err && userData){
              let userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
              if (userChecks.length < config.maxChecks){
                let checkId = helper.randomString(20);
                //create the check object and include the phone
                let dataPayload = {
                  'phoneNumber' : phoneNumber,
                  'protocall' : protocall,
                  'id' : checkId,
                  'successCodes' : successCodes,
                  'url' : url,
                  'method' : method,
                  'timeoutseconds' : timeoutseconds
                }

                // Save the object
                dataLib.create('checks',checkId,dataPayload,function(err){
                  if (!err){
                    userData.checks = userChecks;
                    userData.checks.push(checkId)
                    dataLib.update('users',phoneNumber,userData,function(err){
                      if(!err){
                        callback(200,dataPayload);
                      }else{
                        callback(500,{'error':'server error: failed to create a new check '});
                      }
                    })
                  }else{
                    callback(500,{'error' : 'server error: failed to create a new check '});
                  }
                })
              }else{
                callback(400,{'error':'checks exceeded.'})
              }

            }else{
              callback(403,{'error':'unauthorized entry'});
            }
          })
        }else{
          callback(403,{'error' : 'invalid token'})
        }
      })
    }else{
      callback(403,{'error':'invalid data entry'})
    }
  }else{
    callback(403,{'error':'data invalid'})
  }
}

handlers._checks.get = function(data,callback){
  //check - get
  //Required - id
  //Optional Data : None
  console.log(data)
  let checkId = typeof(data.queryString.id) == 'string' && data.queryString.id.length > 0 ? data.queryString.id : false;

  if (checkId){
    //read the checks
    dataLib.read('checks',checkId,function(err,checksData){
      if (!err && checksData){
      let token = typeof(data.headers.token) == 'string' && data.headers.token.length > 0 ? data.headers.token : false;
      //token verification
      handlers._tokens.verifyTokens(token,checksData.phoneNumber,function(ValidToken){
        if (ValidToken){
          //read the users
          dataLib.read('users',checksData.phoneNumber,function(err,userData){
            if (!err){
              //remove the passowrd to send back
              delete userData.password
              callback(200,checksData);
            }else{
              callback(403,{'error': 'unauthorized entry'});
            }
          })
        }else{
          callback(403,{'error' : 'unauthorized entry'})
        }
      })
    }else{
      callback(403,{'error' : 'unauthorized entry'})
    }
    })
  }else{
    callback(400,{'error' : 'invalid data entry'})
  }
}

//update parameters @PARAM :
/*
phoneNumber,
protocall,
successCodes,
url,
method,
timeoutseconds
*/

handlers._checks.put = function(data,callback){
  //validation checks
  //let phoneNumber = typeof(data.phoneNumber) == 'number' ? data.phoneNumber : false;
  let checkId = typeof(data.payload.checkId) == 'string' && data.payload.checkId.length == handlers.defaultTokenLength ? data.payload.checkId : false;
  let protocall = typeof(data.payload.protocall) == 'string' && ['http','https'].indexOf(data.payload.protocall) > -1 ? data.payload.protocall : false;
  let successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array ? data.payload.successCodes : false;
  let url = typeof(data.payload.url) == 'string' && data.payload.url.length > 0 ? data.payload.url : false;
  let method = typeof(data.payload.httpmethod) == 'string' && data.payload.httpmethod.length > 0 ? data.payload.httpmethod : false;
  let timeoutseconds = typeof(parseInt(data.payload.timeoutseconds)) == 'number' ? parseInt(data.payload.timeoutseconds) : false;
  //console.log(data,checkId,protocall,successCodes,url,method,timeoutseconds)
  if (protocall || successCodes || url || method || timeoutseconds){
    //read the check if check is valid
  dataLib.read('checks',checkId,function(err,checkData){
    if(!err && checkData){
      //read the token & check the token
      let token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length ? data.headers.token : false;
      handlers._tokens.verifyTokens(token,checkData.phoneNumber,function(tokenIsValid){
        if (tokenIsValid){
          //check the user & check the user's check list

              if (protocall){
                checkData.protocall = protocall;
              }
              if (successCodes){
                checkData.successCodes = successCodes;
              }
              if (method){
                checkData.method = method;
              }
              if (url){
                checkData.url = url;
              }
              if (timeoutseconds){
                checkData.timeoutseconds = timeoutseconds;
              }
              console.log(checkData)

          //replace the target checked values
          dataLib.update('checks',checkId,checkData,function(err){
            if (!err){
              callback(200,checkData);
            }else{
              callback(500,{'error':'server error'});
            }
          })
        }else{
          callback(403,{'error':'unauthorized entry'})
        }
      })
    }else{
      callback(403,{'error' : 'check is not exist'});
    }
  });
  }else{
    callback(403,{'error' : 'invalid data entry'});
  }
}

handlers._checks.delete = function(data,callback){
  //validation check
  let checkId = typeof(data.queryString.checkId) == 'string' && data.queryString.checkId.trim().length == handlers.defaultTokenLength ? data.queryString.checkId : false;
  //if those details are  validate

  if (checkId){
    //go throught the check Files
    dataLib.read('checks',checkId,function(err,checkData){
      //if the check exsists
      if (!err && checkData){
        let tokenId = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == handlers.defaultTokenLength ? data.headers.token : false;
        //go through the token files
        handlers._tokens.verifyTokens(tokenId,checkData.phoneNumber,function(validToken){
          if (validToken){
              dataLib.read('users',checkData.phoneNumber,function(err,userData){
                if (!err){
                  if (userData.checks.indexOf(checkId) > -1){
                    userData.checks.splice(userData.checks.indexOf(checkId),1)
                    dataLib.update('users',checkData.phoneNumber,userData,function(err){
                      if(!err){
                        dataLib.delete('checks',checkId,function(err){
                          if (!err){
                            callback(200)
                          }else{
                            callback(500,{'error' : 'server failure'})
                          }
                        })
                      }else{
                        callback(500,{'error':'server error'})
                      }
                    })
                  }else{
                    callback(400,{'error' : 'unauthorized access'})
                  }
                }else{
                  callback(403,{'error' : 'unauthorized access'})
                }
              })
          }else{
            callback(403,{'error':'invalid Token:un authorized access'})
          }
        })
        //delete the check
      }else{
        callback(403,{'error' : 'unauthorized entry'})
      }
    })
  }else{
      callback(400,{'error': 'invalid data entry'});
  }
}

module.exports = handlers;
