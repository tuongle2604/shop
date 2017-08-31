var mysql      = require('mysql');
var Crypto = require("crypto-js");
var SECRET_KEY ="adfgpoiufkjhgfmbvcx!@#$%^&*()";
var dbconfig = require('../config');

var connection = mysql.createConnection(dbconfig);

var findUserRegister = function(email,cb){
  var sql = `SELECT * FROM account where email = ?`;
  connection.query(sql, [email] ,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results[0]);
      }
  })
}

var insertUserRegister = function(user,cb){
  var arr = [];
  arr.push(user);
  var sql = `INSERT INTO account (email,role, password) VALUES ?`;
  connection.query(sql,[arr],function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results.insertId);
      }
  })
}

var findUserDeserializer = function(id,cb){
  var sql = `SELECT * FROM account where id='${id}'`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results[0]);
      }
  })
}

  var checkEmailFB = function(email,cb){
    var sql = `SELECT id,facebook FROM account`;
    connection.query(sql, function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          var arr;
              var i=0;
              for(;i<results.length;i++){
                  var arr = results[i].facebook.split(";");
                    if(arr[0]==email){
                      cb(results[i].id);
                      break;
                    }
                  }
                if(i==results.length){
                    cb('Not yet');
                  }
        }
    })
  }


  var checkIdFB = function(id,cb){
    var sql = `SELECT id,facebook FROM account`;
    connection.query(sql, function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          var arr;
              var i=0;
              for(;i<results.length;i++){
                  var arr = results[i].facebook.split(";");
                    if(arr[0]==id){
                      cb(results[i].id);
                      break;
                    }
                  }
                if(i==results.length){
                    cb('Not yet');
                  }
            }
        })
    }

    var insertFb = function(user,cb){
      var sql = `INSERT INTO account (facebook,role) VALUES  (?,?)`;
      connection.query(sql,user,function (error, results, fields) {
          if(error){
            cb(0);
          }else{
            cb(results.insertId);
          }
      })
    }


    var checkEmailGoogle = function(email,cb){
      var sql = `SELECT id,google FROM account`;
      connection.query(sql, function (error, results, fields) {
          if(error){
            cb(0);
          }else{
            var arr;
                var i=0;
                for(;i<results.length;i++){
                    var arr = results[i].google.split(";");
                      if(arr[0]==email){
                        cb(results[i].id);
                        break;
                      }
                    }
                  if(i==results.length){
                      cb('Not yet');
                    }
          }
      })
    }

    var insertGoogle = function(user,cb){
      var sql = `INSERT INTO account (google,role) VALUES  (?,?)`;
      connection.query(sql,user,function (error, results, fields) {
          if(error){
            cb(0);
          }else{
            cb(results.insertId);
          }
      })
    }


var encode = function(password){
  return Crypto.AES.encrypt(password, SECRET_KEY).toString();
}
var decode = function(password){
  return Crypto.AES.decrypt(password, SECRET_KEY).toString(Crypto.enc.Utf8);
}


module.exports  = {
  findUserRegister,
  insertUserRegister,
  findUserDeserializer,
  encode,
  decode,
  checkIdFB,
  checkEmailFB,
  insertFb,
  checkEmailGoogle,
  insertGoogle,

}
