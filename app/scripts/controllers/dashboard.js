'use strict';

angular.module('mileagetrackApp').directive(
  'dateInput',
  function(dateFilter) {
    return {
      require: 'ngModel',
      template: '<input type="date"></input>',
      replace: true,
      link: function(scope, elm, attrs, ngModelCtrl) {
        ngModelCtrl.$formatters.unshift(function (modelValue) {
          return dateFilter(modelValue, 'yyyy-MM-dd');
        });

        ngModelCtrl.$parsers.unshift(function(viewValue) {
          return new Date(viewValue);
        });
      },
    };
  });

angular.module('mileagetrackApp')
  .controller('DashboardCtrl', ['$scope', 'User', 'Vehicle', 'Entry', 'dateFilter', function ($scope, User, Vehicle, Entry, dateFilter) {

    $scope.vehicles = Vehicle.list();

    $scope.vehicle = Vehicle.get({id: $scope.currentUser.defaultVehicle});

    $scope.vehicle.$promise.then(function () {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    });


    $scope.newEntryForm = {
      date: dateFilter(new Date(), 'yyyy-MM-dd'),
    };

    $scope.newEntry = function(form) {
      if(form.$valid) {
        var entry = new Entry(angular.extend({ vehicle: $scope.vehicle._id }, form));
        entry.$save();
      }
    };

  }]);
