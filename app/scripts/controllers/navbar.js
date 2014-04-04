'use strict';

angular.module('mileagetrackApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
