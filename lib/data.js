/*
* @PARAM
* @// TODO:
* @Author
* @date
*/

const fs = require('fs');
const path = require('path');
const helper = require('./helpers.js');

const lib = {};

lib.baseDir = path.join(__dirname,'/../.data/');

//openfile
lib.create = function(dir,file,data,callback){
  //open file for writting
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDiscriptor){
    if (!err && fileDiscriptor){
      //convert data to string
      let stringData = JSON.stringify(data);
      //write into a file
      fs.writeFile(fileDiscriptor,stringData,function(err){
        if (!err){
          fs.close(fileDiscriptor,function(err){
            if (!err){
              callback(false);
            }else{
              callback('error occured: failed to close the file');
            }
          });
        }else{
          callback('error occured: failed to write file!')
        }
      });
    }else{
      callback('error occured: failed to open file');
    }
  });
}

//readFile
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
    if (!err && data){
      data = helper.jsonParser(data);
      callback(false,data)
    }else{
      callback(err,data)
    }
  })
};


//update File
lib.update = function(dir,file,data,callback){
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDiscriptor){
    if (!err && fileDiscriptor){
      this.data = JSON.stringify(data);
      fs.truncate(fileDiscriptor,function(err){
        if (!err){
          fs.writeFile(fileDiscriptor,this.data,function(err){
            if (!err && fileDiscriptor){
              fs.close(fileDiscriptor,function(err){
                if (!err){
                  callback(false);
                }else{
                  callback('error occured: close')
                }
              })
            }else{
              callback('error occured: write')
            }
          });
        }else{
          callback('error occured: truncate')
        }
      });
    }else{
      callback('error occured: open');
    }
  });
}

//delete file
lib.delete = function(dir,file,callback){
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    }else{
      callback('error occured: delete');
    }
  });
}


lib.list = function(dir,callback){
  fs.readdir(lib.baseDir + dir + '/',function(err,data){
    if (!err && data && data.length > 0){
      let trimedFileNames = [];
      data.forEach(function(currentFileName){
        trimedFileNames.push(currentFileName.replace('.json',''));
      })
        callback(false,trimedFileNames);

  }else{
    callback(err,data)
  }
  })
}

//export the module
module.exports = lib;
