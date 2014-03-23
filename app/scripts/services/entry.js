'use strict';

angular.module('mileagetrackApp')
  .factory('Entry', function ($resource) {
    return $resource('/api/vehicle/:vehicle/entry/:id', { vehicle: '@vehicle', id: '@id' }, {
  });
});
