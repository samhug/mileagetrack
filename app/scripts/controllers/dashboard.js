'use strict';

angular.module('mileagetrackApp')
  .controller('DashboardCtrl', ['$scope', 'User', 'Vehicle', function ($scope, User, Vehicle) {
    $scope.vehicles = Vehicle.list();

  }]);
