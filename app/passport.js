
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var qr = require('../models/user');
var validator = require('validator');
module.exports = function(passport){

passport.serializeUser(function(id, done) {
  done(null,id);
});

passport.deserializeUser(function(id, done) {
  qr.findUserDeserializer(id,function(data){
    done(null, data);
  })
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
      if(validator.isEmail(email)){
        qr.findUserRegister(email,function(data){
            if(data===undefined){
              if(password.length<7){
                return done(null, false,  req.flash('Message', 'mat khau phai co hon 7 ky tu'));
              }else{
                var user = [];
                user.push(email);
                user.push('customer');
                user.push(qr.encode(password));
                qr.insertUserRegister(user,function(id){
                  if(id===0){
                    return done(null, false,  req.flash('Message', 'loi truy van'));
                  }else{
                      return done(null,id);
                  }
                })
              }
            }else if(data===0){
              return done(null, false,  req.flash('Message', 'loi truy van'));
            }else{
              return done(null, false,  req.flash('Message', 'email da ton tai'));
              }
            })
      }else{
        return done(null, false,  req.flash('Message', 'email khong hop le'));
      }

    }
  ));


  passport.use('local-login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
      },
    function(req,email, password, done) {

        qr.findUserRegister(email,function(data){
        if(data===undefined){
          return done(null, false,  req.flash('Message', 'sai email'));
        }
        else if(data===0){
          return done(null, false,  req.flash('Message', 'loi truy van'));
        }else{
          var pw = qr.decode(data.password);
          if(pw==password){
            return done(null,data.id);
          }else{
            return done(null, false,  req.flash('Message', 'sai mat khau'));
          }
        }
      })

    }
  ));

  passport.use(new FacebookStrategy({
          clientID        : '377155859334760',
          clientSecret    : '83f3b29647f9a053cd315dbdf0cf279b',
          callbackURL     : 'http://localhost:3000/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'link',  'photos', 'email'],
          enableProof: true
      },
      function(req,token, refreshToken, profile, done) {
          process.nextTick(function() {
              if(profile.emails !==undefined){
                var str = profile.emails[0].value.concat(";",profile.displayName).concat(";",profile.profileUrl).concat(";",profile.photos[0].value);
                var email =profile.emails[0].value;
                qr.checkEmailFB(email,function(data){
                  if(data===0){
                      return done('loi truy van')
                  }else if(data==='Not yet'){
                    var user = [];
                    user.push(str);
                    user.push('customer');
                      qr.insertFb(user,function(id){
                      if(id===0){
                        console.log('loi truy van');
                        }else{
                          return done(null, id);
                        }
                      })
                    }else{
                      return done(null, data);
                    }
              })
        }else{
                var id=profile.id;
                var str=id.concat(";",profile.displayName).concat(";",profile.profileUrl).concat(";",profile.photos[0].value);
                  qr.checkIdFB(id,function(data){
                  if(data===0){
                      return done('loi truy van')
                  }else if(data==='Not yet'){
                    var user = [];
                    user.push(str);
                    user.push('customer');
                      qr.insertFb(user,function(id){
                      if(id===0){
                        console.log('loi truy van');
                        }else{
                          return done(null, id);
                        }
                      })
                    }else{
                      return done(null, data);
                    }
              })
          }

       })
     }));

     passport.use(new GoogleStrategy({
                    clientID        : '359603809187-021gqicvhol3vqdd1h8vhsc6v69lqs99.apps.googleusercontent.com',
                    clientSecret    : 'FKns_naE2-Gjsz5yUdpwdvNJ',
                    callbackURL     : 'http://localhost:3000/auth/google/callback',
                },function(token, refreshToken, profile, done) {
             process.nextTick(function() {
                  var email = profile.emails[0].value;
                  var providerData = profile._json;
                  var str=email.concat(";",profile.displayName).concat(";",providerData.url).concat(";",profile.photos[0].value);
                  qr.checkEmailGoogle(email,function(data){
                    if(data===0){
                        return done('loi truy van')
                    }else if(data==='Not yet'){
                      var user = [];
                      user.push(str);
                      user.push('customer');
                        qr.insertGoogle(user,function(id){
                        if(id===0){
                          console.log('loi truy van');
                          }else{
                            return done(null, id);
                          }
                        })
                    }else{
                      return done(null, data);
                    }
                  });
             })
         }));

}
