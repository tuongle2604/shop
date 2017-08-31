var mysql      = require('mysql');
var dbconfig = require('../config');
var connection = mysql.createConnection(dbconfig);

var getProductDetailForPayment = function(items,cb){
  var arrId = [];
  var query = '';
  var first = true;
  items.forEach(function(e){
    arrId.push(e.id)
    if(first ==false){
      query+='or id = ?';
    }
    first = false;
  })
  var sql = `SELECT id,name,price,img FROM phone where (id = ? ${query}) `;
  connection.query(sql,arrId ,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}
var insertPayment = function(data,cb){
  var sql = `INSERT INTO payment (items,date,total,method,id_paypal,status) VALUES  (?,?,?,?,?,?)`;
  connection.query(sql,data,function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}


module.exports  = {
  getProductDetailForPayment,
  insertPayment
}
