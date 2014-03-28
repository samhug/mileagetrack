'use strict';

var should   = require('should'),
    mongoose = require('mongoose'),
    request  = require('supertest'),
    Promise  = require('mpromise'),
    app      = require('../../../server');

var User     = mongoose.model('User'),
    Vehicle  = mongoose.model('Vehicle');

var createTestUsers = function() {

    var authRequest1, authRequest2, user1, user2;

    var testUserData = [
      {
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
      },
      {
        provider: 'local',
        name: 'Test User 2',
        email: 'test2@test.com',
        password: 'test'
      }
    ];

    var promise1 = new Promise();
    var promise2 = new Promise();

    // Insert test user data into database
    User.create(testUserData, function (err, _user1, _user2) {

      user1 = _user1;
      user2 = _user2;


      authRequest1 = request.agent(app);
      authRequest1
        .post('/api/session')
        .send({ email: user1.email, password: 'test' })
        .end(function(err, res) {
          promise1.resolve(err);
        });

      authRequest2 = request.agent(app);
      authRequest2
        .post('/api/session')
        .send({ email: user2.email, password: 'test' })
        .end(function(err, res) {
          promise2.resolve(err);
        });

    });


    return promise1.chain(promise2).then(function () {
      return [authRequest1, authRequest2, user1, user2];
    });
};

describe('Vehicles API', function() {

  var user1Request, user2Request, user1, user2;
  var vehicle;
  
  before(function(done) {

    User.remove().exec();
    Vehicle.remove().exec();

    createTestUsers().then(function(args) {

      user1Request = args[0];
      user2Request = args[1];
      user1 = args[2];
      user2 = args[3];


      return Vehicle.create({
        name: '2002 Ford Escape',
        owner: user1._id,
      }, function(err) {
        if (err) throw err;
      });
    })
    .then(function() {
      return Vehicle.create({
        name: 'User 2\'s vehicle',
        owner: user2._id,
      }, function(err) {
        if (err) throw err;
      });
    })
    .then(function() {
      return Vehicle.create({
        name: '2014 Volkswagen Jetta',
        owner: user1._id,
      }, function(err) {
        if (err) throw err;
      });
    })
    .then(function(_vehicle) {
      vehicle = _vehicle;
      done();
    });

  });

  /*
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
  */

  describe('GET /api/vehicle', function() {

    it('should respond with 401 error', function(done) {
      request.agent(app)
        .get('/api/vehicle')
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with JSON array', function(done) {
      user1Request
        .get('/api/vehicle')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    // Assert that user 2 can only retrieve the 1 vehicle he owns.
    it('should respond with JSON array of length 1', function(done) {
      user2Request
        .get('/api/vehicle')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.length.should.equal(1);
          done();
        });
    });
  });

  describe('GET /api/vehicle/:id', function() {
    it('should respond with JSON object', function(done) {
      user1Request
        .get('/api/vehicle/'+vehicle._id)
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
