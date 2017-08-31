var mysql      = require('mysql');
var dbconfig = require('../config');
var connection = mysql.createConnection(dbconfig);


var getIndexData = function(cb){
  connection.query('SELECT * FROM `phone` ORDER BY `id` DESC LIMIT 20', function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getDetailData = function(name,cb){
  var link = '/dien-thoai/'+name;
  var sql = `SELECT * FROM phone where link='${link}'`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getCategoryNumber = function(category,cb){
  category=category.toLowerCase();
  var sql = `SELECT COUNT(*) AS categoryCount FROM phone where type ='${category}'`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getCategoryData = function(currentPage,category,cb){
  var limit = ((currentPage-1)*4);
  var sql = `SELECT name,price,img,link FROM phone where type='${category}' ORDER BY 'id' DESC LIMIT 4  OFFSET ${limit}`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getAllDataNumber = function(cb){
  var sql = `SELECT COUNT(*) AS countAll FROM phone`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getAllData = function(currentPage,cb){
  var limit = ((currentPage-1)*4);
  var sql = `SELECT name,price,img,link FROM phone ORDER BY 'id' DESC LIMIT 4  OFFSET ${limit}`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        cb(results);
      }
  })
}

var getDataSearch = function(text,cb){
  text = text.toLowerCase();
  var texHaveSpace = text.replace(" ", "");
  var sql = `SELECT name,price,img,link FROM phone`;
  connection.query(sql, function (error, results, fields) {
      if(error){
        cb(0);
      }else{
        var arr = [];
        results.forEach(function(e){
          var  name = e.name.toLowerCase();
          var checkNoSpace = name.indexOf(text);
          var checkHaveSpace = name.indexOf(texHaveSpace);
          if(checkNoSpace!=-1 || checkHaveSpace!=-1){
            arr.push(e)
          }
        })
        cb(arr)
      }
  })
}
module.exports  = {
  getIndexData,
  getDetailData,
  getCategoryNumber,
  getCategoryData,
  getAllDataNumber,
  getAllData,
  getDataSearch
}
