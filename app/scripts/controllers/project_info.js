'use strict';

angular.module('mileagetrackApp')
  .controller('ProjectInfoCtrl', function ($scope, $modalInstance, ProjectInfoService) {

    ProjectInfoService.get(function(projectInfo) {
      $scope.projectInfo = projectInfo;
    });

    $scope.close = function () {
      $modalInstance.close();
    };

  });
