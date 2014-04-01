'use strict';

var mongoose = require('mongoose'),
    helpers  = require('../helpers');

var User     = mongoose.model('User'),
    Vehicle  = mongoose.model('Vehicle'),
    Entry    = mongoose.model('Entry');


describe('Entry API', function() {

  var testUser;
  
  before(function(done) {

    User.remove().exec();
    Vehicle.remove().exec();
    Entry.remove().exec();

    testUser = new helpers.TestUser();
    testUser.wait(function() {
      testUser.createVehicle();
      testUser.wait(function() {
        testUser.addEntry(testUser.vehicles[0]);
        testUser.createVehicle();
        testUser.wait(function() {
          testUser.addEntry(testUser.vehicles[1]);
          testUser.addEntry(testUser.vehicles[1]);
          done();
        });
      });
    });

  });


  describe('GET /api/vehicle/:id/entry', function() {

    it('should respond with JSON array', function(done) {
      testUser.request
        .get('/api/vehicle/'+testUser.vehicles[0]._id+'/entry')
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

    it('should respond with 2 entries', function(done) {
      testUser.request
        .get('/api/vehicle/'+testUser.vehicles[1]._id+'/entry')
        .expect(200)
        .expect('content-type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.body.length.should.equal(2);
          done();
        });
    });
  });

});
