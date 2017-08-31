var mysql      = require('mysql');
var Crypto = require("crypto-js");
var SECRET_KEY ="adfgpoiufkjhgfmbvcx!@#$%^&*()";
var dbconfig = require('../config');
var connection = mysql.createConnection(dbconfig);


var getManageProductData = function(cb){
  connection.query('SELECT name,price,img,link,id FROM `phone` ORDER BY `id` DESC', function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getEditData = function(id,cb){
  var sql = `SELECT * FROM phone where id='${id}'`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var insertData = function(arr,cb){
  var sql = `INSERT INTO phone (name,type, price,img,link,config) VALUES ?`;
  connection.query(sql,[arr],function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(1);
      }
  })
}

var updateDataNoImg = function(arr,cb){
  // var arr1 =['test',22]
  var sql = "UPDATE phone set name =? , type =? ,price =? ,link =? , config =?   WHERE id = ?";
  // var sql = "UPDATE phone set name =?    WHERE id = ?";
  connection.query(sql,arr,function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(1);
      }
  })
}

var updateDataImg = function(arr,cb){
  var sql = "UPDATE phone set name =? , type =? ,price =? ,img =? ,link =? , config =?   WHERE id = ?";
  connection.query(sql,arr,function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(1);
      }
  })
}

var deleteData = function(id,cb){
  var sql = "DELETE FROM phone WHERE id = ?";
  connection.query(sql,[id],function (err, result, fields) {
      if(err){
        cb(0);
      }else{
        cb(1);
      }
  })
}

var getProductCategoryData = function(category,cb){
  var sql = 'SELECT * FROM `phone` where type = ? ORDER BY `id` DESC';
  connection.query(sql,category,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

//account

var getAccountData = function(cb){
  var sql = 'SELECT id,email,facebook,google,role FROM `account`';
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var checkExistAccount = function(email,cb){
  var sql = `SELECT id,email FROM account where email = ?`;
  connection.query(sql,email,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}
  var insertAccount = function(account,cb){
    var sql = `INSERT INTO account (email,role,password) VALUES  (?,?,?)`;
    connection.query(sql,account,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
}

  var getAccountEditData = function(id,cb){
    var sql = `SELECT * FROM account where id =?`;
    connection.query(sql,id ,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }

  var updateEditAccount = function(account,cb){
    var sql = "UPDATE account set role =? , password =? WHERE id = ?";
    connection.query(sql,account,function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
        }
    })
  }

  var updateEditAccountNoPw = function(account,cb){
    var sql = "UPDATE account set role =?  WHERE id = ?";
    connection.query(sql,account,function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
        }
    })
  }

  var deleteAccount = function(id,cb){
    var sql = "DELETE FROM account WHERE id = ?";
    connection.query(sql,[id],function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
        }
    })
  }

  var getAccountRoleData = function(role,cb){
    var sql = 'SELECT * FROM `account` where role = ?';
    connection.query(sql,role,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }

  var getPaymentData = function(cb){
    var sql = 'SELECT id,date,total,status,method FROM `payment` ';
    connection.query(sql,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }

  var getPaymentDetailData = function(id,cb){
    var sql = `SELECT * FROM payment where id =?`;
    connection.query(sql,id ,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }

  var getPaymentSeenlData = function(cb){
    var sql = `SELECT * FROM payment where status = ?`;
    connection.query(sql,1 ,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }
  var getPaymentNotSeenData = function(cb){
    var sql = `SELECT * FROM payment where status = ?`;
    connection.query(sql,0 ,function (error, results, fields) {
        if(error){
          cb(0);
        }else{
          cb(results);
        }
    })
  }
  var updatePaymentStatus = function(arr,cb){
    var sql = "UPDATE payment set status = ?  WHERE id = ?";
    connection.query(sql,arr,function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
        }
    })
  }


  var deletePayment = function(id,cb){
    var sql = "DELETE FROM payment WHERE id = ?";
    connection.query(sql,id,function (err, result, fields) {
        if(err){
          cb(0);
        }else{
          cb(1);
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
  getManageProductData,
  getEditData,
  insertData,
  updateDataNoImg,
  updateDataImg,
  deleteData,
  getProductCategoryData,
  getAccountData,
  checkExistAccount,
  insertAccount,
  encode,
  decode,
  getAccountEditData,
  updateEditAccount,
  updateEditAccountNoPw,
  deleteAccount,
  getAccountRoleData,
  getPaymentData,
  getPaymentDetailData,
  getPaymentSeenlData,
  getPaymentNotSeenData,
  updatePaymentStatus,
  deletePayment
}
