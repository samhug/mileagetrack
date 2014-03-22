'use strict';

angular.module('mileagetrackApp')
  .factory('Vehicle', ['$resource', function ($resource) {
    return $resource('/api/vehicles/:id', {}, {
      list: {
        method: 'GET',
        params: {
          id:''
        },
        isArray: true
      }
    });
  }]);
