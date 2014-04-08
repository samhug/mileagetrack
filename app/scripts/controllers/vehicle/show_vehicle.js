'use strict';

angular.module('mileagetrackApp')
  .controller('VehicleShowCtrl', function ($scope, Entry) {

    $scope.mpgAvg = 'N/A';
    $scope.$pmAvg = 'N/A';

    var updateEntries = function() {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id }, function () {

        var mpgTotal = 0;
        var $pmTotal = 0;

        // Calculate trip and MPG
        var prevOdometer;
        angular.forEach($scope.entries, function (entry, i) {
          if (i > 0) {
            entry.trip = entry.odometer - prevOdometer;
            entry.mpg = entry.trip / entry.gallons;
            entry.$pm = entry.price / entry.trip;

            mpgTotal += entry.mpg;
            $pmTotal += entry.$pm;
          }
          prevOdometer = entry.odometer;
        });

        // Caclulate Averages
        $scope.mpgAvg = mpgTotal / $scope.entries.length;
        $scope.$pmAvg = $pmTotal / $scope.entries.length;

      });
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
