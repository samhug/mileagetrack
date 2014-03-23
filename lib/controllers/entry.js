'use strict';

var restful  = require('node-restful'),
    middleware = require('../middleware'),
    Entry  = restful.model('Entry');

var filterByVehicle = function(req, res, next) {
  req.query = {owner: req.param.vehicle_id};
  return next();
};

var methods = function (names) {
    var _methods = [];
    names.forEach(function (name) {
      _methods.push({
        method: name,
        before: [middleware.auth, middleware.filterByOwner]
      });
    });
    return _methods;
};

Entry.methods(methods(['get','put','delete','post']));

exports.Entry = Entry;
