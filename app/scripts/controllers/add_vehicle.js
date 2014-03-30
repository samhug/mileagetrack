'use strict';

angular.module('mileagetrackApp')
  .controller('VehicleAddCtrl', function ($scope, $location, Vehicle) {
    $scope.alerts = [];

    if ($location.search('new_user') !== undefined) {
      $scope.alerts.push({ type: 'info', msg: 'Add a vehicle to get started!'}); 
    }

    // Add Vehicle Scope
    var vscope = $scope.addVehicle = {
      errors: {},
    };

    vscope.vehicleAdd = function(form) {
      vscope.submitted = true;

      if (form.$valid) {
        Vehicle.save(vscope.vehicle, function() {
          vscope.message = 'Vehicle Added';
          $location.path("/");
        }, function () {
          vscope.message = 'Failed! ' + vscope.vehicle;
        });
      }
    };

  });
