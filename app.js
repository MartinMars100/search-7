'use strict';

// load modules
var express = require('express'),
    jsonParser = require('body-parser').json,
    mongoose = require('mongoose'),
    therapies = require('./routes/therapies'),
    users = require('./routes/users'),
    index = require('./routes/index'),
    auth = require('./routes/auth'),
    bodyParser = require('body-parser'), //very important 
    methodOverride = require('method-override'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require ('express-session'),
    MongoStore = require('connect-mongo')(session),
    User = require("./models/user"),
    Twit       = require('twit');   
    
require('dotenv').config();    
var app = express();
var environment = process.env.NODE_ENV;
var callback = '';

console.log('log process.env.FACEBOOK_APP_ID = ' + process.env.FACEBOOK_APP_ID );
console.log('app.js process.env.NODE_ENV = ' + process.env.NODE_ENV);
console.log('app.js process.env.TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);


console.log('app.js process.env.PORT = ' + process.env.PORT);
var port = process.env.PORT || 5000;
console.log('log process.env.PORT = ' + process.env.PORT)
console.log ('log port = ' + port)
console.log('log process.env.NODE_ENV = ' + process.env.NODE_ENV);

// Check environmental variables
if (process.env.NODE_ENV === 'production'){
  console.log('app.js process.env.NODE_ENV is defined and = ' + process.env.NODE_ENV)
  console.log('app.js production TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
} else {
  console.log('app.js process.env.NODE_ENV is defined and = ' + process.env.NODE_ENV)
  console.log('app.js development TWIT_ACCESS_TOKEN = ' + process.env.TWIT_ACCESS_TOKEN);
  console.log('TWIT_ACCESS_TOKEN_SECRET = ' + process.env.TWIT_ACCESS_TOKEN_SECRET);
  console.log('TWIT_CONSUMER_KEY = ' + process.env.TWIT_CONSUMER_KEY);
  console.log('TWIT_CONSUMER_SECRET = ' + process.env.TWIT_CONSUMER_SECRET);
}

if (environment = 'production') { 
 callback = "https://search-7.herokuapp.com/auth/facebook/return";
}

function generateOrFindUser(accessToken, refreshToken, profile, done){
  if(profile.emails[0]){
    User.findOneAndUpdate({
      email: profile.emails[0].value
    }, {
      name: profile.displayName || profile.username,
      email: profile.emails[0].value,
      photo: profile.photos[0].value
    }, {
      upsert: true
    }, 
    done);
  }else {
    var noEmailError = new Error('Your email privacy settings prevent you from signing into Seach Very Easy ')
    done(noEmailError, null);
  }  
};

// Configure Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL:  callback,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, generateOrFindUser));


passport.serializeUser(function(user, done){
  done(null, user._id);
});
passport.deserializeUser(function(userId, done){
  User.findById(userId, done);
});

//route handling - - very important for put routes to work
app.use(methodOverride('_method'));

// parse incoming requests
app.use(jsonParser());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/search-therapy-1', { useMongoClient: true }, function(err) {
  console.log('MONGODB_URI = ' + process.env.MONGODB_URI);
  if(err) {
    console.log('Failed connecting to Mongodb');
  } else {
    console.log('Successfully connected to Mongo');
  }
});

var db = mongoose.connection;

// use sessions for tracking logins
app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  res.locals.admin = req.session.admin;
  res.locals.environment = req.session.environment;
  res.locals.tweets = req.session.tweets;
  next();
});

//Initialize Passport
app.use(passport.initialize());

//Restore Session
app.use(passport.session());

// set our port
app.set('port', process.env.PORT || 5000);

// setup our static route to serve files from the "public" folder
app.use('/static', express.static(__dirname +'/src/public'));

// setup our views
app.set('view engine', 'pug');  
app.set('views', __dirname + '/src/public/templates'); //Use __dirname since we
//sometimes run with a nodemon command with a path to the server.js file.

app.use('/', therapies);
app.use('/therapies', therapies);
app.use('/users', users);
app.use('/', index);
app.use('/auth', auth);
app.use('/profile', index );
app.use('/register', index );
app.use('/twitter', index);

// routes handling
app.use('/api/', therapies);
app.use('/api/therapies', therapies);
// app.use('/api/login', login);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.get('/error', function(req, res) { //error route is run when a connection error occurs
	var message;
	if (errorMsg === 'twitter-fail') {
		message = 'Couldn\'t connect with twitter.com';
	} else {
		message = 'Error connecting';
	}
	res.render('error', {message: message});
});

//Seed db everytime
// config     = require('./src/config');  
require('./src/seed');

// Basic Listen
var server = app.listen(app.get('port'), function() {
  console.log('THE Express server is listening on port ' + server.address().port);
});

module.exports = app;

