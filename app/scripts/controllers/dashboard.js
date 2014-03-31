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
  .controller('DashboardCtrl', function ($scope, $location, User, Vehicle, Entry, dateFilter) {

    $scope.vehicles = Vehicle.list();

    $scope.vehicles.$promise.then(function () {
      // If the user doesn't have any vehicles registered, redirect them to the
      // add vehicle page with the new_user param.
      if ($scope.vehicles.length === 0) {
        $scope.message = 'test';
        $location.search('newUser');
        $location.path('/vehicle/add');
        return;
      }
    });

    $scope.vehicle = Vehicle.get({id: $scope.currentUser.defaultVehicle});

    $scope.vehicle.$promise.then(function () {
      $scope.entries = Entry.query({ vehicle: $scope.vehicle._id });
    });


    $scope.newEntryForm = {
      date: dateFilter(new Date(), 'yyyy-MM-dd'),
    };

    $scope.newEntry = function(form) {
      var e = angular.extend({ vehicle: $scope.vehicle._id }, form);
      var entry = new Entry(e);
      entry.$save();
    };

  });
