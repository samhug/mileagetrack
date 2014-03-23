'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    vehicles = require('./controllers/vehicles'),
    entry   = require('./controllers/entry'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  vehicles.Vehicle.register(app, '/api/vehicle');

  entry.Entry.register(app, '/api/vehicle/:vehicle_id/entry');

  // User
  app.post('/api/users', users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.get('/api/users/:id', middleware.auth, users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
