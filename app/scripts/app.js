'use strict';

angular.module('mileagetrackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular-loading-bar'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/pages/main',
        controller: 'MainCtrl',
      })
      .when('/login', {
        templateUrl: 'partials/pages/login',
      })
      .when('/signup', {
        templateUrl: 'partials/pages/signup',
      })

      .when('/dashboard', {
        templateUrl: 'partials/pages/dashboard',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .when('/settings', {
        templateUrl: 'partials/pages/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/vehicle/add', {
        templateUrl: 'partials/vehicle/add',
        controller: 'VehicleAddCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }

      else if (next.authenticate === false) {
        $location.path('/dashboard');
      }

    });
  });
