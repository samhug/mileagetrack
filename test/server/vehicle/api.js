'use strict';

var should   = require('should'),
    mongoose = require('mongoose'),
    request  = require('supertest'),
    Promise  = require('mpromise'),
    app      = require('../../../server');

var User     = mongoose.model('User'),
    Vehicle  = mongoose.model('Vehicle');

var authTestUser = function() {
    var promise = new Promise();

    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    })
    .then(function(user) {
      var authRequest = request.agent(app);
      authRequest
        .post('/api/session')
        .send({ email: user.email, password: 'test' })
        .end(function(err, res) {
          // user1 will manage its own cookies
          // res.redirects contains an Array of redirects
          promise.resolve(err, [authRequest, user]);
        });
    });

    return promise;
};

describe('Vehicles API', function() {

  var testUser, userRequest;

  var testVehicle;
  
  before(function(done) {

    authTestUser().then(function(args) {

      userRequest = args[0];
      testUser = args[1];

      return Vehicle.create({
        name: '2002 Ford Escape',
        owner: testUser._id,
      });
    })
    .then(function() {
      return Vehicle.create({
        name: '2014 Volkswagen Jetta',
        owner: testUser._id,
      });
    })
    .then(function(vehicle) {
      testVehicle = vehicle;
      done();
    });

  });

  describe('POST /api/vehicles', function() {
    it('should insert vehicle into db', function(done) {
      userRequest
        .post('/api/vehicles')
        .send({ owner: testUser._id, name: 'Mythical Test Vehicle' })
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('GET /api/vehicles', function() {
    it('should respond with JSON array', function(done) {
      userRequest
        .get('/api/vehicles')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('GET /api/vehicles/:id', function() {
    it('should respond with JSON object', function(done) {
      userRequest
        .get('/api/vehicles/'+testVehicle._id)
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

});
