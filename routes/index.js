'use strict';
console.log('log index.js file');

var express = require('express'),
    router = express.Router(),
    Therapy = require('../models/therapy.js'),
    User = require('../models/user.js'),
    mid = require('../middleware'),
    Twit       = require('twit');
    
var object = {}, //new Object literal notation
    tweets = {},
    messages = {},
    page,
    errorMsg	 = '',
    banner,
    services = [];
    
function Image(img) {
  this.img = img;
}

// Check environmental variables
if (process.env.NODE_ENV === 'production'){
  console.log('index.js process.env.NODE_ENV is defined and = ' + process.env.NODE_ENV)
  console.log('index.js production TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
} else {
  console.log('index.js process.env.NODE_ENV is defined and = ' + process.env.NODE_ENV)
  console.log('index.js development TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
}

var config = {
  consumer_key:         process.env.TWIT_CONSUMER_KEY,
  consumer_secret:      process.env.TWIT_CONSUMER_SECRET,
  access_token:         process.env.TWIT_ACCESS_TOKEN,
  access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
};

// Initialise application
var T = new Twit(config),
    app = express();
    process.env.PORT || 5000;

var params = {         //Parameters are used in our calls to Twitter
  screen_name: 'MartyKunsman',
  count: 5
};

// GET / all therapies
router.get('/', mid.setEnv, function(req, res, next){
  // set session environment
  Therapy.find({})
    .exec(function(err, therapies){
      if(err) {
        return next(err);
      }
      console.log('log 1 req.session.userId = ' + req.session.userId)
      if (req.session.userId === undefined){
        req.session.userId = null;
      }
      console.log('log 2 req.session.userId = ' + req.session.userId)
      res.render("index", {therapies: therapies, title: "Therapies" });
    });
});

router.get('/twitter', function(req, res, next){
  res.render('login');
  var account = T.get('account/settings', params, gotAccount) //This retrieves hd screenname
  .then(function(account){
    console.log('log 1111 ************* router get /twitter');
    if (errorMsg === 'twitter-fail') { //If errMsg variable has an error message 
      var error = "Sorry, there are no current Twitter Posts.";
      return res.render('profile', {
        error: error
      });    
    }
    var tweets = T.get('statuses/user_timeline', params, gotDataTweets)
    .then(function(tweets){
      console.log('log 2222 ----=======------- router get /twitter');
      res.render("profile", {
        account: account.data,
        tweets: tweets.data,
        title: "Latest Tweets from Search Therapy"
      }); // end render function
    }); // end then
  }); // end then
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', { 
      title: 'Facebook Log In', 
      // user: req.user 
  });
});

// POST /login
router.post('/login', function(req, res, next){
});

// GET /logout
router.get('/logout', function(req, res, next){
  if (req.session.userId) {
    req.session.userId = null;
  }
  req.logout();
  res.redirect('/');
});


/* GET profile page */
router.get('/profile', function(req, res, next) {
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
              return res.render('profile', {
                error: error,
                user: user
              }); //end return
          } //end else
        }) //end exec function
  } //end else
}); //end GET

// GET /register
// router.get('/register',  function(req, res, next){
router.get('/register', mid.loggedOut, function(req, res, next){
  return res.render('register', {
      title: 'Sign Up'
  });
});

// POST /register
router.post('/register', function(req, res, next) {
   var userData = {
       email: req.body.email,
       name: req.body.name,
       password: req.body.password
   };
   if (req.body.password !== req.body.confirmPassword) {
     var error = "Passwords do not match";
     return res.render('register', {
        user: userData,
        title: "Register Here!",
        error: error
      });
   }
       
   // use schema's create method to insert documet into Mongo
   User.create(userData, function (error, user) {
       if (error) {
           res.render("register", {
           user: user,
           error: error
           });
        } else {
          req.session.userId = req.user._id;
          res.render("profile", {
          user: user          
          });
       }
   });
});

//// Twitter Display Functions

// function gotAccountTest(err, data, res, next){  
//   if (err) {
//     console.log('log gotAccountTest function err found err = ' + err);
//     errorMsg = "twitter-fail"; // This will be caught on app.get route
//   }  
//   console.log('gotAccountTest after err check');

// } //end function

function gotAccount(err, data, res, next){  // Used for screen name
  console.log('log gotAccount function---------------------')
  if (err) {
    console.log('log error in gotAccount function.');
    errorMsg = "twitter-fail"; // This will be caught on app.get route
  }  
  console.log(' log 2 in gotAccount function -------------');
  object.account = data;
  console.log('object.accont = ' + object.account);
  console.log('object.account.screen_name = ' + object.account.screen_name);
  return object.account;
}
    
function gotDataTweets(err, data, response){  // Our lists of tweets
  if (err) {
    console.log('log err found!!!!!!!!! gotDataTweets Function');
    errorMsg = "twitter-fail"; // This will be caught on app.get route
  } 
  console.log('log err after err check gotDataTweets Function');
  object.tweets = data;   // load tweets to object   
  // console.log('object.tweets ========== ' + object.tweets);
  tweets = object.tweets;
  // console.log('tweets[0].tweet.text = ' + tweets[0].tweet.text);
  return object.tweets;
} 

module.exports = router;