'use strict';

angular.module('mileagetrackApp')
  .factory('Vehicle', ['$resource', function ($resource) {
    return $resource('/api/vehicle/:id', { id: '@id' }, {
      list: {
        method: 'GET',
        params: {
          id: ''
        },
        isArray: true
      }
    });
  }]);
