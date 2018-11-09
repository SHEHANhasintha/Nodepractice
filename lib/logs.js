/*
 *
 *
 *
*/

const _dataLib = require('./data');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const logFile = {}
logFile.baseDir = path.join(__dirname,'/../.logs/');

//append function
logFile.appendString = function(fileName,string,callback){
  //console.log(fileName)
  fs.open(logFile.baseDir + fileName + '.log','a',function(err,fileDiscriptor){
    if(!err && fileDiscriptor){
      fs.appendFile(fileDiscriptor,string+'\n',function(err){
        if(!err){
          fs.close(fileDiscriptor,function(err){
            if (!err){
              callback(false);
            }else{
              callback('error occured: closing file')
            }
          })
        }else{
          callback('error occured: appendingstring')
        }
      })
    }else{
      callback('error occured: opening the log file')
    }
  })
}


//list out files
logFile.listing = function(dir,callback){
  fs.readdir(logFile.baseDir,function(err,logRedData){
    if (!err && logRedData && logRedData.length > 0){
      let fileHolder = [];
      logRedData.forEach(function(currentFile){
        if (currentFile.indexOf('.log') > -1)
          fileHolder.push(currentFile.replace('.log',''))
      })
      callback(false,fileHolder)
    }else{
      callback('error occured: reading the directory')
    }
  })
}

//compress files
logFile.compress = function(logData,callback){
  let dataStream = logData + '.log';
  let dest = logData + Date.now() + '.gz.b64';
  //read the file
  fs.readFile(logFile.baseDir + dataStream,'utf8',function(err,inputString){
    if (!err && inputString){
      //compress the file
      zlib.gzip(inputString,function(err,buffer){
        if (!err && buffer){
          //cpen a new file in the same name
          fs.open(logFile.baseDir+dest,'wx',function(err,fileDiscriptor){
            if (!err && fileDiscriptor){
              //write into the file
              fs.writeFile(fileDiscriptor,buffer.toString("base64"),function(err){
                  if (!err){
                    fs.close(fileDiscriptor,function(err){
                      if(!err){
                        callback(false)
                      }else{
                        callback("could not close the file")
                      }
                    })
                  }else{
                    callback("couldn't write into the file")
                  }
              })
            }else{
              callback("couldn't open a new file")
            }
          })

      }else{
        callback("can not read the buffer")
      }
    })
    }else{
      callback("could't read the file");
    }
  })
}

//truncate
logFile.truncate = function(logId,callback){
  fs.truncate(logFile.baseDir+logId+'.log',0,function(err){
    if (!err){
      callback(false);
    }else{
      callback("couldn't truncate the log file")
    }
  })
}

//decompress
logFile.decompress = function(fileName,callback){
  fs.readFile(logFile.baseDir+filename+'.gz.b64','utf8',function(err,str){
    if (!err && str){
      let dataBuffer = Buffer.from(str,"base64");
      zlib.unzip(dataBuffer,function(err,outputbuffer){
        if (!err && outputbuffer){
          let str = outputbuffer.toString();
          callback(false,outputbuffer);
        }else{
          callback("couldn't output decompressed data")
        }
      })
    }else{
      callback("couldn't read the file: decompressing")
    }
  })
}

module.exports = logFile;
