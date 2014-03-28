'use strict';

var restful  = require('node-restful'),
    middleware = require('../middleware'),
    Vehicle  = restful.model('Vehicle');


var filterByOwner = function(req, res, next) {
  req.quer = req.quer.where('owner', req.user._id);
  return next();
};

var methods = function (names) {
    var _methods = [];
    names.forEach(function (name) {
      _methods.push({
        method: name,
        before: [middleware.auth, filterByOwner]
      });
    });
    return _methods;
};

Vehicle.methods(methods(['get','put','delete','post']));

/*Vehicle.methods([
    {
      method: 'get',
      before: [middleware.auth, filterByOwner]
    },
  'put',
  'delete',
  'post'
]);*/

/*
Vehicle.methods(['get', 'put', 'delete', 'post']);


Vehicle.before('get', filterByOwner);
Vehicle.before('delete', filterByOwner);
*/

exports.Vehicle = Vehicle;
