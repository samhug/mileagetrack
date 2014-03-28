'use strict';

var restful  = require('node-restful'),
    middleware = require('../middleware'),
    Entry  = restful.model('Entry');

var filterByVehicle = function(req, res, next) {
  //req.quer = req.quer.where('owner', req.user._id);
  return next();
};

var methods = function (names) {
    var _methods = [];
    names.forEach(function (name) {
      _methods.push({
        method: name,
        before: [middleware.auth, filterByVehicle]
      });
    });
    return _methods;
};

Entry.methods(methods(['get','put','delete','post']));

exports.Entry = Entry;
