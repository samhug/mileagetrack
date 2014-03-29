'use strict';

var restful  = require('node-restful'),
    middleware = require('../middleware'),
    Vehicle  = restful.model('Vehicle');


var filterByOwner = function(req, res, next) {
  req.quer = req.quer.where('owner', req.user._id);
  req.body.owner = req.user._id;

  next();
};

var makeDefault = function(req, res, next) {
  if (req.body.makeDefault) {
    req.user.defaultVehicle = res.locals.bundle._id;
    req.user.save(function() {
      next();
    });
  } else {
    next();
  }
};

Vehicle.methods([
    {
      method: 'get',
      before: [middleware.auth, filterByOwner]
    },
    {
      method: 'post',
      before: [middleware.auth, filterByOwner],
      after: makeDefault
    },
    {
      method: 'put',
      before: [middleware.auth, filterByOwner],
      after: makeDefault
    },
    {
      method: 'delete',
      before: [middleware.auth, filterByOwner]
    },
]);

exports.Vehicle = Vehicle;
