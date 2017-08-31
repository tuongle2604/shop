var express = require('express');
var router = express.Router();
var qr = require('../models/admin')
var multer  = require('multer')
var bodyParser = require('body-parser')
var app = express();
var validator = require('validator');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
module.exports = function(app,passport){
      var storage	=	multer.diskStorage({
          destination: function (req, file, callback) {
            callback(null, './public/uploads');
          },
          filename: function (req, file, callback) {
            callback(null,Date.now()+file.originalname);
          }
        });
      var upload = multer({ storage : storage}).single('file');
  /* GET users listing. */
    router.get('/',isAdmin,function(req, res, next) {
      res.render('./admin/index');
    });

    router.get('/product',isAdmin, function(req, res, next) {
      qr.getManageProductData(function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('./admin/product',{data:data});
        }
      })
    });

    router.get('/product/add',isAdmin, function(req, res, next) {
      res.render('./admin/addProduct');
    });

    router.post('/product/add',isAdmin,function(req, res, next) {
      upload(req, res, function (err) {
        if (err) {
          res.redirect('/error');
        }else{
          var arr = GetContentAdd(req);
          qr.insertData(arr,function(data){
            if(data===0){
              res.redirect('/error');
            }else{
              res.redirect('/admin/product');
            }
          })
        }

      })
    });

    router.get('/product/edit/:id',isAdmin, function(req, res, next) {
      qr.getEditData(req.params.id,function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          var config = data[0].config;
          var arr = config.split(';')
          var arrCongig = [];
          arr.forEach(function(e){
            var pos = e.lastIndexOf(":");
            var str = e.slice(pos+2);
            arrCongig.push(str);
          })
          res.render('./admin/editProduct',{data:data[0],config:arrCongig});
        }
      })
    });

    router.post('/product/edit',isAdmin,function(req, res, next) {
      upload(req, res, function (err) {
        if (err) {
          res.redirect('/error');
        }else{
          if(req.file){
            var arr = GetContentEditImg(req);
            qr.updateDataImg(arr,function(data){
              if(data===0){
                res.redirect('/error');
              }else{
                res.redirect('/admin/product');
              }
            })
          }else{
            var arr = GetContentEditNoImg(req);
            qr.updateDataNoImg(arr,function(data){
              if(data===0){
                res.redirect('/error');
              }else{
                res.redirect('/admin/product');
              }
            })
          }
        }

      })
    });

    router.get('/product/delete/:id',isAdmin, function(req, res, next) {
        qr.deleteData(req.params.id,function(data){
          if(data===0){
            res.redirect('/error');
          }else{
            res.redirect('/admin/product');
          }
        })
    });

    router.post('/product/category',isAdmin, function(req, res, next) {
      if(req.body.category==='iphone'){
        res.redirect('/admin/product/iphone');
      }else if(req.body.category==='samsung'){
        res.redirect('/admin/product/samsung');
      }else if(req.body.category==='oppo'){
        res.redirect('/admin/product/oppo');
      }else if(req.body.category==='sony'){
        res.redirect('/admin/product/sony');
      }else if(req.body.category==='vivo'){
        res.redirect('/admin/product/vivo');
      }else if(req.body.category==='HUAWEI'){
        res.redirect('/admin/product/huawei');
      }else{
        res.redirect('/admin/product');
      }
    });

    router.get('/product/:category',isAdmin, function(req, res, next) {
      var category = req.params.category;
      var category = category.toLowerCase();
      if(category =='iphone' || category =='samsung' || category =='oppo' ||category =='sony' || category =='vivo' || category =='huawei'){
        qr.getProductCategoryData(category,function(data){
          if(data===0){
            res.redirect('/error');
          }else{
            res.render('./admin/product',{data:data});
          }
        })
      }else{
        res.redirect('/admin/product');
      }
    });

//acount
    router.get('/account',isAdmin, function(req, res, next) {
      qr.getAccountData(function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('./admin/account',{data:data});
        }
      })
    });

    router.get('/account/add',isAdmin, function(req, res, next) {
      res.render('./admin/addAccount',{message:''});
    });

    router.post('/account/add',isAdmin, function(req, res, next) {
      if(validator.isEmail(req.body.email)){
        qr.checkExistAccount(req.body.email,function(data){
          if(data===0){
            res.redirect('/error');
          }else if(data.length != 0){
            res.render('./admin/addAccount',{message:'Email đã tồn tại'});
          }else{
            if(req.body.password.length<7){
              res.render('./admin/addAccount',{message:'Mật khẩu phải nhiều hơn 7 ký tự'});
            }else{
              var account = [];
              account.push(req.body.email);
              account.push(req.body.role);
              account.push(qr.encode(req.body.password));
              qr.insertAccount(account,function(cb){
                if(cb===0){
                  res.redirect('/error');
                }else{
                  res.render('./admin/addAccount',{message:'Thêm thành công'});
                }
              })
            }
          }
        })
      }else{
        res.render('./admin/addAccount',{message:'Email không hợp lệ'});
      }

    });

    router.get('/account/edit/:id',isAdmin, function(req, res, next) {
      qr.getAccountEditData(req.params.id,function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('./admin/editAccount',{data:data[0],message:''});
        }
      })
    });

    router.post('/account/edit',isAdmin,function(req, res, next) {
      if(req.body.password==''){
          var account = [];
          account.push(req.body.role);
          account.push(req.body.id);
          qr.updateEditAccountNoPw(account,function(cb){
          if(cb===0){
              res.redirect('/error');
          }else{
              res.redirect('/admin/Account');
          }
        })
      }else{
          if(req.body.password.length<7){
              res.render('/admin/Account',{message:'Mật khẩu phải nhiều hơn 7 ký tự'});
          }else{
              var account = [];
              account.push(req.body.role);
              account.push(qr.encode(req.body.password));
              account.push(req.body.id);
              qr.updateEditAccount(account,function(cb){
              if(cb===0){
                  res.redirect('/error');
              }else{
                  res.redirect('/admin/Account');
              }
            })
          }
      }
    });

    router.get('/account/delete/:id',isAdmin, function(req, res, next) {
        qr.deleteAccount(req.params.id,function(data){
          if(data===0){
            res.redirect('/error');
          }else{
            res.redirect('/admin/account');
          }
        })
    });

    router.post('/account/role',isAdmin, function(req, res, next) {
      if(req.body.role==='customer'){
        res.redirect('/admin/account/role/customer');
      }else if(req.body.role==='partner'){
        res.redirect('/admin/account/role/partner');
      }else if(req.body.role==='admin'){
        res.redirect('/admin/account/role/admin');
      }else{
        res.redirect('/admin/account');
      }
    });

    router.get('/account/role/:role',isAdmin, function(req, res, next) {
      var role = req.params.role;
      if(role =='customer' || role =='partner' || role =='admin'){
        qr.getAccountRoleData(role,function(data){
          if(data===0){
            res.redirect('/error');
          }else{
            res.render('./admin/account',{data:data});
          }
        })
      }else{
        res.redirect('/admin/account');
      }
    });



    router.get('/payment',isAdmin, function(req, res, next) {
      qr.getPaymentData(function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('admin/payment',{data:data});
        }
      })
    });

    router.post('/payment/status',isAdmin, function(req, res, next) {
      if(req.body.status==='seen'){
        res.redirect('/admin/payment/seen');
      }else if(req.body.status==='notseen'){
        res.redirect('/admin/payment/notseen');
      }else{
        res.redirect('/admin/payment');
      }
    });

    router.get('/payment/seen',isAdmin, function(req, res, next) {
      qr.getPaymentSeenlData(function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('admin/payment',{data:data});
        }
      })
    });

    router.get('/payment/notseen',isAdmin, function(req, res, next) {
      qr.getPaymentNotSeenData(function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          res.render('admin/payment',{data:data});
        }
      })
    });


    router.get('/payment/detail/:id',isAdmin, function(req, res, next) {
      qr.getPaymentDetailData(req.params.id,function(data){
        if(data===0){
          res.redirect('/error');
        }else{
          var update =[];
          update.push(1);
          update.push(req.params.id);
          qr.updatePaymentStatus(update,function(result){
            if(data===0){
              res.redirect('/error');
            }else{
              var arr = JSON.parse(data[0].items);
              res.render('./admin/paymentDetail',{data:arr,detail:data[0]});
            }
          })

        }
      })
    });


    router.get('/payment/delete/:id',isAdmin, function(req, res, next) {
        qr.deletePayment(req.params.id,function(data){
          if(data===0){
            res.redirect('/error');
          }else{
            res.redirect('/admin/payment');
          }
        })
    });

    app.get('/logout',function(req,res){
      req.logout();
			res.redirect('login');
		})

    app.use('/admin', router);

    function isAdmin(req,res,next){
    	if (req.isAuthenticated() && req.user.role=='admin'){
        return next();
    	}else{
        res.redirect('/login');
    	}
    }


    function GetContentAdd(req){
      var arr = [];
      var data = [];
      var link = req.body.name.toLowerCase();
      link = link.replace(/ /g, "-");
      var realLink =`/dien-thoai/${link}`
      var path =`/uploads/${req.file.filename}`;
      var name = req.body.name;

      data.push(name);
      var pos = name.indexOf(" ");
      var type = name.slice(0,pos);
      var typepLower = type.toLowerCase();
      data.push(typepLower);
      data.push(req.body.price);
      data.push(path);
      data.push(realLink);
      var str=`Màn hình : ${req.body.display};Camera : ${req.body.camera};RAM : ${req.body.ram};Bộ nhớ trong : ${req.body.rom};Hệ điều hành : ${req.body.os};Chipset : ${req.body.chip};CPU : ${req.body.cpu};GPU : ${req.body.gpu};Kích thước : ${req.body.size};`
      data.push(str);
      arr.push(data);
      return arr;
    }
    function GetContentEditNoImg(req){
      var arr = [];
      var data = [];
      var link = req.body.name.toLowerCase();
      link = link.replace(/ /g, "-");
      var realLink =`/dien-thoai/${link}`
      var name = req.body.name;

      data.push(name);
      var pos = name.indexOf(" ");
      var type = name.slice(0,pos);
      var typepLower = type.toLowerCase();
      data.push(typepLower);
      data.push(req.body.price);
      data.push(realLink);
      var str=`Màn hình : ${req.body.display};Camera : ${req.body.camera};RAM : ${req.body.ram};Bộ nhớ trong : ${req.body.rom};Hệ điều hành : ${req.body.os};Chipset : ${req.body.chip};CPU : ${req.body.cpu};GPU : ${req.body.gpu};Kích thước : ${req.body.size};`
      data.push(str);
      data.push(req.body.id);
      return data;
    }
    function GetContentEditImg(req){
      var arr = [];
      var data = [];
      var link = req.body.name.toLowerCase();
      link = link.replace(/ /g, "-");
      var realLink =`/dien-thoai/${link}`
      var path =`/uploads/${req.file.filename}`;
      var name = req.body.name;

      data.push(name);
      var pos = name.indexOf(" ");
      var type = name.slice(0,pos);
      var typepLower = type.toLowerCase();
      data.push(typepLower);
      data.push(req.body.price);
      data.push(path);
      data.push(realLink);
      var str=`Màn hình : ${req.body.display};Camera : ${req.body.camera};RAM : ${req.body.ram};Bộ nhớ trong : ${req.body.rom};Hệ điều hành : ${req.body.os};Chipset : ${req.body.chip};CPU : ${req.body.cpu};GPU : ${req.body.gpu};Kích thước : ${req.body.size};`
      data.push(str);
      data.push(req.body.id);
      return data;
    }
}
