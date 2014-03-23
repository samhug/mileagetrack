'use strict';

var mongoose = require('mongoose'),
  Promise = require('mpromise'),
  User = mongoose.model('User'),
  Vehicle = mongoose.model('Vehicle');

/**
 * Populate database with sample application data
 */

var promise = new Promise();

Vehicle.find({}).remove(function () {
  User.find({}).remove(function () {
    promise.resolve();
  });
});

var test_user;

promise
  .then(function () {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    });
  })
  .then(function(user) {
    test_user = user;

    return Vehicle.create({
      name: '2002 Ford Escape',
      owner: test_user._id,
    });
  })
  .then(function(vehicle) {
    test_user.defaultVehicle = vehicle._id;
    test_user.save();

    return Vehicle.create({
      name: '2014 Volkswagen Jetta',
      owner: test_user._id,
    });
  })
  .end(function() {
    console.log('finished populating user and vehicle data.');
  });

