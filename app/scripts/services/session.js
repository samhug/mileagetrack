'use strict';

angular.module('mileagetrackApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
