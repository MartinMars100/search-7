'use strict';

var mongoose = require('mongoose');

var TherapySchema = new mongoose.Schema({
  therName: {
    type: String,
    required: [true, "Please Enter Therapy Name"]
  },
  therStreet: {
    type: String,
    required: [true, "Please Enter Therapy Street Address"]
  },
  therCity: {
    type: String,
    required: [true, "Please Enter Therapy City"]
  },
  therState: {
    type: String,
    required: [true, "Please Enter Therapy State"]
  },
  therImage1: String,
  therImage2: String,
  therImage3: String,
  therSvc1: String,
  therSvc2: String,
  therSvc3: String,
  therAbout: String,
  therDeals: String
});

var Therapy = mongoose.model('Therapy', TherapySchema);

module.exports = Therapy;