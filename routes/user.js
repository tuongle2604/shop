var express = require('express');
var router = express.Router();
var qr = require('../models/user')
/* GET home page. */
module.exports = function(app,passport){

  router.get('/register', function(req, res, next) {
    res.render('./user/register',{ message: req.flash('Message') });
  });

  router.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/login',
		failureRedirect : '/register',
		failureFlash : true
	}));


  router.get('/login', function(req, res, next) {
    res.render('./user/login',{ message: req.flash('Message') });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
  app.get('/auth/facebook/callback',
         passport.authenticate('facebook', {
             successRedirect : '/',
             failureRedirect : '/login'
         }));

   app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
   app.get('/auth/google/callback',
         	passport.authenticate('google', {
         			successRedirect : '/',
         			failureRedirect : '/login'
         	}));

  router.get('/error', function(req, res, next) {
    res.render('error');
  });

  app.use('/',router);
}

// module.exports = router;
