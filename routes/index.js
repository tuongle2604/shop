var express = require('express');
var router = express.Router();
var qr = require('../models/index')
/* GET home page. */

module.exports = function(app,passport){

  router.get('/', function(req, res, next) {
    qr.getIndexData(function(data){
      if(data===0){
        res.redirect('/error');
      }else{
        res.render('./index/index',{data:data});
      }
    })

  });

  router.get('/dien-thoai/:name',function(req, res, next) {
    var name = req.params.name.replace(/ /g, "-");
    var href = name.replace(/ /g, "-");
    qr.getDetailData(href,function(data){
      if(data===0){
        res.redirect('/error');
      }else{
        var config = data[0].config;
        var arr = config.split(';')

        res.render('./index/detail',{data:data[0],config:arr});
      }
    })

  });

  router.get('/theloai/:category/:number', function(req, res, next) {
    qr.getCategoryNumber(req.params.category,function(count){
      if(count===0){
        res.redirect('/error');
      }else{
        var currentPage = req.params.number;
        qr.getCategoryData(currentPage,req.params.category,function(data){
          var totalRec      = count[0].categoryCount;
          var pageCount     =  Math.ceil(totalRec /4);
          res.render('./index/category',{data:data,pageCount:pageCount,currentPage:currentPage});
        })
      }
    })
  });



  router.get('/list/:number', function(req, res, next) {
    qr.getAllDataNumber(function(count){
      if(count===0){
        res.redirect('/error');
      }else{
        var currentPage = req.params.number;
        qr.getAllData(currentPage,function(data){
          var totalRec      = count[0].countAll;
          var pageCount     =  Math.ceil(totalRec /4);
          res.render('./index/list',{data:data,pageCount:pageCount,currentPage:currentPage});
        })
      }
    })
  });

  router.post('/search', function(req, res, next) {
    res.redirect('/search/'+req.body.search);
  });

  router.get('/search/:text', function(req, res, next) {
    qr.getDataSearch(req.params.text,function(data){
      if(data===0){
        res.redirect('/error');
      }else{
        res.render('./index/search',{data:data});
      }
    })
  });

  router.get('/api/:text', function(req, res, next) {
    var href = req.params.text.replace(/ /g, "-");
    var href = href.toLowerCase();
    qr.getDetailData(href,function(data){
      if(data===0){
        res.redirect('/error');
      }else{
        res.json(data[0]);
      }
    })
  });

  router.get('/cart', function(req, res, next) {
    res.render('./index/cart');
  });


  router.get('/error', function(req, res, next) {
    res.render('error');
  });

  app.use('/', router);

}
