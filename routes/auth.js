var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js');
  
//GET /auth/login/facebook
router.get('/login/facebook',
  passport.authenticate('facebook', {scope: ['email']}));
  
//GET /auth/login/facebook/return
router.get('/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/'}),
  function(req, res){
      //Success Auth, redirect profile page
      if(! req.user) {
        var error = "You are not authorized to view this page.";
        return res.render('profile', {
            error: error
        });
      } else {
        User.findById(req.user._id) 
            .exec(function (error,user){
              if(error) {
                return res.render('profile', {
                error: error
                }); //end return
              } else {
                  req.session.userId = user._id;
                  req.session.email = user.email;
                  req.session.admin = user.admin;
                  res.redirect('/profile');
              } //end else
            }); //end exec function
      } //end else
  });
  
//GET /auth/logout
router.get('/logout', function(req, res){
  req.session.userId = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;