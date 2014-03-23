'use strict';

angular.module('mileagetrackApp')
  .controller('SettingsCtrl', ['$scope', 'User', 'Auth', 'Vehicle', function ($scope, User, Auth, Vehicle) {

    var _scope;

    // Change Password Scope
    $scope.changePassword = _scope = {
      errors: {},
    };
    _scope.changePassword = function(form) {
      _scope.submitted = true;

      console.dir(_scope);

      if(form.$valid) {
        Auth.changePassword( _scope.user.oldPassword, _scope.user.newPassword )
        .then( function() {
          _scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          _scope.errors.other = 'Incorrect password';
        });
      }
    };


    // Add Vehicle Scope
    var vscope;
    $scope.addVehicle = vscope = {
      errors: {},
    };

    vscope.vehicleAdd = function(form) {
      vscope.submitted = true;

      if(form.$valid) {
        Vehicle.save(vscope.vehicle, function() {
          vscope.message = 'Vehicle Added';
        }, function () {
          vscope.message = 'Failed! '+vscope.vehicle;
        });
      }
    };


  }]);
