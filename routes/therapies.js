'use strict';
console.log('log therapies.js 1111111111111111------------');

var express = require('express'),
    router = express.Router(),
    Therapy = require('../models/therapy.js'),
    Twit       = require('twit'),
    mid = require('../middleware');

var object = {}, //new Object literal notation
    tweets = {},
    messages = {},
    page,
    errorMsg	 = '',
    banner,
    services = [];

//Check for Heroku environment
console.log('therapies.js log process.env.NODE_ENV = ' + process.env.NODE_ENV);

console.log('log process.env.TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
if (process.env.NODE_ENV === 'production'){
  console.log('process.env.NODE_ENV = production NODE_ENV = ' + process.env.NODE_ENV);
} else {
  console.log('log process.env.NODE_ENV does not = production NODE_ENV = ' + process.env.NODE_ENV);
}

// Check environmental variables
if (process.env.NODE_ENV === 'production'){
  console.log('therapies.js process.env.NODE_ENV is production and = ' + process.env.NODE_ENV)
  console.log('therapies.js production TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('therapies.js TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('therapies.js TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('therapies.js TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
} else {
  console.log('therapies.js process.env.NODE_ENV is not production and = ' + process.env.NODE_ENV)
  console.log('therapies.js development TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('therapies.js TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('therapies.js TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('therapies.js TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
}

var config = {
  consumer_key:         process.env.TWIT_CONSUMER_KEY,
  consumer_secret:      process.env.TWIT_CONSUMER_SECRET,
  access_token:         process.env.TWIT_ACCESS_TOKEN,
  access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
};

// Initialise application
var T = new Twit(config);

var params = {         //Parameters are used in our calls to Twitter
  screen_name: 'martykunsman',
  count: 5
};

/* Create a Remove Therapy form. */
router.get("/:id/remove", function(req, res, next){
  Therapy.findById(req.params.id).then(function(therapy){
    if(therapy) {
      res.render('therapies/remove', {
        therapy: therapy,
        title: "Remove Therapy"
      });
    } else {
      res.send(404);
    }
  });
});

// Get New Therapy form
router.get('/new', function(req, res, next){
  res.render("therapies/new", {
    title: "New Therapy"
  });
});

/* Create an Edit therapy form. */
router.get('/:id/edit', function(req, res, next) {
  Therapy.findById(req.params.id).then(function(therapy){
    res.render("therapies/edit", {
      therapy: therapy
    });
  });
});

/* Edit Therapy With a Put */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var therapy = req.body;
  Therapy.findByIdAndUpdate(id, therapy, function(err, therapy) {
    if(err) {
      return res.status(500).json({err: err.message });
    } 
    res.redirect("/therapies/" + therapy.id + "/edit");
    // res.json({'therapy': therapy, message: 'Therapy Updated'}); 
  });
});

// POST /api/ 201
// Creates a therapy, sets the Location header to "therapy.id/edit", and returns content */
router.post('/', function(req, res, next) {
  var therapy = req.body;
  // use schema's create method to insert documet into Mongo
  Therapy.create(therapy, function(error, therapy) {
    if(error) {
      res.render("therapies/new", {
        therapy: therapy,
        title: "New Therapy",
        error: error
      });
      // return res.status(500).json({error: error.message });
    }else {
       res.redirect('/therapies/' + therapy.id + '/edit');
    }
  });
});
         
// Get therapy list
router.get('/list', function(req, res, next){
  Therapy.find({})
    .exec(function(error, therapies){
      if(error) {
        res.render("therapies/list", {
          therapies: therapies,
          error: error
          });
      }
      res.render("therapies/list", {
        therapies: therapies,
        title: "Therapies" 
      });
    });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Therapy.findByIdAndRemove(id, function(err,result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.redirect('/therapies/list');
    // res.json({ message: 'Therapy Deleted' });
  });
});

/* GET Therapy Details Page */
router.get('/:id/details', function(req, res, next) {
  services = [];
  Therapy.findById(req.params.id).then(function(therapy){
    if(therapy.therSvc1 > ''){
      services.push(therapy.therSvc1);
    }
    if(therapy.therSvc2 > ''){
      services.push(therapy.therSvc2);
    }
    if(therapy.therSvc3 > ''){
      services.push(therapy.therSvc3);
    }
    
    var account = T.get('account/settings', params, gotAccount) //This retrieves hd screenname
    .then(function(account){
      var tweets = T.get('statuses/user_timeline', params, gotDataTweets)
      .then(function(tweets){
        res.render("therapies/details", {
          therapy: therapy,
          services: services,
          account: account.data,
          tweets: tweets.data,
          title: "Therapy Details"
        }); // end render function
      }); // end then
    }); // end then
  });  // end Therapy.findById
}); // end router get id/details

//// Twitter Display Functions

function gotAccount(err, data, res, next){  // Used for screen name
  if (err) {
    errorMsg = "twitter-fail"; // This will be caught on app.get route
  }  
  object.account = data;
  return object.account;
}
    
function gotDataTweets(err, data, response){  // Our lists of tweets
  if (err) {
    errorMsg = "twitter-fail"; // This will be caught on app.get route
  } 
  object.tweets = data;   // load tweets to object   
  tweets = object.tweets;
  return object.tweets;
} 

module.exports = router;
