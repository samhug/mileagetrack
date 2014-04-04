'use strict';

angular.module('mileagetrackApp')
  .controller('VehicleShowCtrl', function ($scope, Entry) {

    var updateEntries = function() {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    };

    // New Mileage Entry Form
    $scope.resetEntryForm = function() {
      $scope.newEntryForm = {
        date: new Date(),
      };
    };

    // When the vehicle is switched update the entries to match.
    $scope.$watch('vehicle', function () {
      updateEntries();
    });

    $scope.resetEntryForm();

    $scope.newEntry = function(form) {
      var e = angular.extend({ vehicle: $scope.vehicle._id }, form);
      var entry = new Entry(e);
      entry.$save();
      $scope.resetEntryForm();
      updateEntries();
    };

  });
