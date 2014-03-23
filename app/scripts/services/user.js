'use strict';

angular.module('mileagetrackApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', { id: '@id' }, {
  });
});
