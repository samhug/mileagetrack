'use strict';

angular.module('mileagetrackApp')
  .service('ProjectInfoService', function ($resource) {
    return $resource('project_info.json', {}, {
      getData: { method:'GET', isArray: false }
    });
  });
