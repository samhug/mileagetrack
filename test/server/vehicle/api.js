'use strict';

var mongoose = require('mongoose'),
    request  = require('supertest'),
    app      = require('../../../server'),
    helpers  = require('../helpers');

var User     = mongoose.model('User'),
    Vehicle  = mongoose.model('Vehicle');


describe('Vehicles API', function() {

  var testUser1, testUser2;
  
  before(function(done) {

    User.remove().exec();
    Vehicle.remove().exec();

    testUser1 = new helpers.TestUser();
    testUser1.wait(function() {
      testUser1.createVehicle();
      testUser1.createVehicle();
    });

    testUser2 = new helpers.TestUser();
    testUser2.wait(function() {
      testUser2.createVehicle();
    });

    testUser1.wait(function() {
      testUser2.wait(function() {
        done();
      });
    });

  });


  describe('GET /api/vehicle', function() {


    it('should respond with 401 error', function(done) {
      request.agent(app)
        .get('/api/vehicle')
        .expect(401)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with JSON array', function(done) {
      testUser1.request
        .get('/api/vehicle')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should create a Vehicle', function(done) {
      testUser1.request
        .post('/api/vehicle')
        .send({ name: 'New Vehicle'})
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.instanceof(Object);
          done();
        });
    });

    it('should create a default Vehicle', function(done) {
      testUser1.request
        .post('/api/vehicle')
        .send({ name: 'New Default Vehicle', makeDefault: true })
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          User.findById(testUser1.userModel._id, function(err, user) {
            if (err) {
              return done(err);
            }

            res.body._id.should.equal(user.defaultVehicle.toString());
            done();
          });

        });
    });

    // Assert that user 2 can only retrieve the 1 vehicle he owns.
    it('should respond with JSON array of length 1', function(done) {
      testUser2.request
        .get('/api/vehicle')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.length.should.equal(1);
          done();
        });
    });
  });

  describe('GET /api/vehicle/:id', function() {
    it('should respond with JSON object', function(done) {
      testUser1.request
        .get('/api/vehicle/'+testUser1.vehicles[0]._id)
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

});
