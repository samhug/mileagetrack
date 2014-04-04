'use strict';

angular.module('mileagetrackApp')
  .controller('DashboardCtrl', function ($scope, $location, User, Vehicle) {

    $scope.vehicles = Vehicle.list();

    // If the user doesn't have any vehicles registered, redirect them to the
    // add vehicle page with the new_user param.
    $scope.vehicles.$promise.then(function () {
      if ($scope.vehicles.length === 0) {
        $scope.message = 'test';
        $location.search('newUser');
        $location.path('/vehicle/add');
        return;
      }
    });

    // Vehicle Select Dropdown
    $scope.selectVehicle = function(vehicle) {
      $scope.vehicle = vehicle;
    };
    $scope.addVehicle = function() {
      $location.path('/vehicle/add');
    };


    $scope.vehicle = Vehicle.get({id: $scope.currentUser.defaultVehicle});

  });
