'use strict';

var mongoose = require('mongoose'),
    Promise  = require('mpromise'),
    request  = require('supertest'),
    app      = require('../../server'),
    Q        = require('q'),
    User     = mongoose.model('User'),
    Vehicle  = mongoose.model('Vehicle'),
    Entry    = mongoose.model('Entry');

var TestUser = function(_unique) {

  var unique = _unique || this._makeRandom();

  var userData = {
    provider: 'local',
    name: 'TestUser '+unique,
    email: 'test'+unique+'@test.com',
    password: 'test'
  };

  this.vehicles = [];
  this.promises = [];

  var p = this._addPromise();

  var this_ = this;

  // Insert test user data into database
  User.create(userData, function (err, userModel) {
    if (err) throw err;

    this_.userModel = userModel;
    this_.request = request.agent(app);

    this_.request
      .post('/api/session')
      .send({ email: userModel.email, password: userData.password })
      .end(function(err, res) {
        if (err) throw err;
        p.resolve();
      });
  });
};

TestUser.prototype._makeRandom = function(l) {
  var LENGTH = l || 8;
  var CHARSPACE = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';

  var index;
  var buf = '';

  for (var i=0; i<LENGTH; i++) {
    index = (Math.random() * (CHARSPACE.length - 1)).toFixed(0);
    buf += CHARSPACE[index];
  }

  return buf;
};

TestUser.prototype._addPromise = function() {
  var p = new Promise();
  this.promises.push(p);
  return p;
};

TestUser.prototype.createVehicle = function(_unique) {
  var unique = _unique || this._makeRandom();

  var this_ = this;
  var p = this._addPromise();

  return Vehicle.create({
    name: 'TestVehicle '+unique,
    owner: this_.userModel._id,
  }, function(err, vehicleModel) {
    if (err) throw err;
    this_.vehicles.push(vehicleModel);
    p.resolve();
  });
};

TestUser.prototype.addEntry = function(vehicle) {
  var p = this._addPromise();

  return Entry.create({
    vehicle: vehicle._id,
    date: new Date().toISOString(),
    odometer: 100000,
    gallons: 10,
    price: 40
  }, function(err, entryModel) {
    if (err) throw err;
    p.resolve();
  });
};

TestUser.prototype.wait = function(fn) {
  Q.all(this.promises).then(fn);
};

module.exports = {
  TestUser: TestUser,
};

