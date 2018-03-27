'use strict';

var express = require('express'),
    router = express.Router(),
    Therapy = require('../models/therapy.js'),
    User = require('../models/user.js');

/* Create a Remove Therapy form. */
router.get("/:id/remove", function(req, res, next){
  User.findById(req.params.id).then(function(user){
    if(user) {
      res.render('users/remove', {
        user: user,
        title: "Remove User"
      });
    } else {
      res.send(404);
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function(err,result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    req.session.userId = null;
    res.redirect('/users/list');
  });
});

// Get user list
router.get('/list', function(req, res, next){
  User.find({})
    .exec(function(error, users){
      if(error) {
      }else{
        res.render("users/list", {
          users: users,
          error: error
          });
      }
    });
  });

// Get New User form
router.get('/new', function(req, res, next){
  res.render("users/new", {
    title: "New User"
  });
});

/* Create an Edit user form. */
router.get('/:id/edit', function(req, res, next) {
  User.findById(req.params.id).then(function(user){
    res.render("users/edit", {
      user: user
    });
  });
});

/* Edit Therapy With a Put */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var userData = {
    admin: req.body.userAdmin
  };
  
  User.findByIdAndUpdate(id, userData, function(error, user) {
    if(error) {
      res.render("users/new", {
        user: userData,
        title: "New Therapy",
        error: error
      });
      // return res.status(500).json({err: err.message });
    } 
    res.redirect("/users/" + user.id + "/edit");
  });
});

// POST /api/ 201
// Creates a new user, sets the Location header to "/", and returns no content */
router.post('/', function(req, res, next) {
  //create object with form input
  var userData = {
     userName: req.body.userName,
     userEmail: req.body.userEmail,
     userAdmin: req.body.userAdmin
  };
  // use schema's create method to insert documet into Mongo
  User.create(userData, function(error, user) {
    if(error) {
      res.render("users/new", {
        user: user,
        title: "New Therapy",
        error: error
      });
      // return res.status(500).json({error: error.message });
    }else {
       res.redirect('/users/' + user.id + '/edit');
    }
  });
});
         
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Therapy.findByIdAndRemove(id, function(err,result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Therapy Deleted' });
  });
});


/* GET Therapy Details Page */
router.get('/:id/details', function(req, res, next) {
  Therapy.findById(req.params.id).then(function(therapy){
    var services = [];
    if(therapy.therSvc1 > ''){
      services.push(therapy.therSvc1);
    }
    if(therapy.therSvc2 > ''){
      services.push(therapy.therSvc2);
    }
    if(therapy.therSvc3 > ''){
      services.push(therapy.therSvc3);
    }
    res.render("therapies/details", {
      therapy: therapy,
      services: services,
      title: "Therapy Details"
    });
  });
});

module.exports = router;
