'use strict';

angular.module('mileagetrackApp')
  .controller('SettingsCtrl', function ($scope, Auth) {

    var _scope;

    // Change Password Scope
    $scope.changePassword = _scope = {
      errors: {},
    };
    _scope.changePassword = function(form) {
      _scope.submitted = true;

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

  });
