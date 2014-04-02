'use strict';

angular.module('mileagetrackApp')
  .controller('DashboardCtrl', function ($scope, $location, User, Vehicle, Entry) {

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
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    };
    $scope.addVehicle = function() {
      $location.path('/vehicle/add');
    };


    $scope.vehicle = Vehicle.get({id: $scope.currentUser.defaultVehicle});
    $scope.vehicle.$promise.then(function () {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    });


    // New Mileage Entry Form
    $scope.newEntryForm = {
      date: new Date(),
    };
    $scope.newEntry = function(form) {
      var e = angular.extend({ vehicle: $scope.vehicle._id }, form);
      var entry = new Entry(e);
      entry.$save();
    };

  });
