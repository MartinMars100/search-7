'use strict';

var Therapy = require('../models/therapy.js');

var therapies = [
    {therName: 'Blue Yoga of Lake Norman',
     therStreet: "1 Lake Norman Blvd",
     therCity: "Cornelius",
     therState: 'NC',
     therImage1: 'blue_yoga.jpg',
     therAbout: 'Great Studio for those who like a slow or fast Vinyassa Flow',
     therDeals: 'Good Karma Class is only $10 on Sundays'
    },
    {therName: 'The Accupuncture Center of NC',
     therStreet: "1212 Main Street",
     therCity: "Davidson",
     therState: 'NC',
     therImage1: 'accupuncture-center2.jpg',
     therAbout: 'We provide Accupuncure Services for the Lake Norman Area of NC',
     therDeals: 'First visit is only $50'
    },
    {therName: 'Melting Point Yoga',
     therStreet: "11 Patton Street",
     therCity: "Huntersville",
     therState: 'NC',
     therImage1: 'melting-point-img2.jpg',
     therAbout: 'Slow Flow and Cardio Vinyassa Yoga',
     therDeals: '3 classes for $30'
    },
    {therName: 'Salt Therapy',
     therStreet: "1110 Jetton Ave",
     therCity: "Huntersville",
     therState: 'NC',
     therImage1: 'salt-therapy2.jpg',
     therAbout: 'Come sit in our salt room for better health.',
     therDeals: 'First Visit is $20'
    },
];

therapies.forEach(function(therapy,index) {
    Therapy.find({'therName': therapy.therName}, function(err, therapies) {
        if(!err && !therapies.length) {
          Therapy.create(therapy, function(error, therapy) {
            if(error) {
              console.log('log error with Therapy.create')
            }
          });
        }
      });
});