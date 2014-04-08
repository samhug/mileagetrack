'use strict';

var restful  = require('node-restful'),
    middleware = require('../middleware'),
    Entry  = restful.model('Entry');

var filterByVehicle = function(req, res, next) {
  req.quer = req.quer.where('vehicle', req.params.vehicle_id).sort('date odometer');
  req.body.vehicle = req.params.vehicle_id;

  next();
};

Entry.methods([
    {
      method: 'get',
      before: [middleware.auth, filterByVehicle]
    },
    {
      method: 'post',
      before: [middleware.auth, filterByVehicle],
    },
    {
      method: 'put',
      before: [middleware.auth, filterByVehicle],
    },
    {
      method: 'delete',
      before: [middleware.auth, filterByVehicle]
    },
]);

exports.Entry = Entry;
