'use strict';

describe('Controller: LoginCtrl', function () {
  
  // load the controller's module
  beforeEach(module('mileagetrackApp'));

  var LoginCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a login function to the scope', function () {
    expect(scope.login).toEqual(jasmine.any(Function));
  });
  
});
