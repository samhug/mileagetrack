'use strict';

angular.module('mileagetrackApp')
  .controller('DashboardCtrl', ['$scope', 'User', 'Vehicle', 'Entry', function ($scope, User, Vehicle, Entry) {

    $scope.vehicles = Vehicle.list();

    $scope.vehicle = Vehicle.get({id: $scope.currentUser.defaultVehicle});

    $scope.vehicle.$promise.then(function () {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    });

    $scope.newEntry = function(form) {
      if(form.$valid) {
        var entry = new Entry(angular.extend({ vehicle: $scope.vehicle._id }, form));
        entry.$save();
      }
    };

  }]);
