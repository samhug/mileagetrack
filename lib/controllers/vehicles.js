'use strict';

var mongoose = require('mongoose'),
    Vehicle = mongoose.model('Vehicle'),
    passport = require('passport');

/**
 * Create vehicle
 */
exports.create = function (req, res, next) {
  var newVehicle = new Vehicle(req.body.extend({owner: req.user}));
  newVehicle.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newVehicle, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  List all vehicles owned by the current user
 */
exports.list = function (req, res, next) {

  return Vehicle.find({owner: req.user.id}, function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });

};

/**
 *  Get info of specified vehicle
 */
exports.show = function (req, res, next) {
  var vehicleId = req.params.id;

  Vehicle.findById(vehicleId, function (err, vehicle) {
    if (err) return next(err);
    if (!vehicle) return res.send(404);

    res.send(vehicle);
  });
};

