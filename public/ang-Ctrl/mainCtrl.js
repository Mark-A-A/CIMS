var mainCtrl = angular.module('mainCtrl', ['ngAnimate']);

mainCtrl.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('public/javascripts/doctor-seed.json').success(function(data) {
    $scope.doctors = data;
    console.log(data);
  });
}]);

mainCtrl.controller("authController", function($scope, $rootScope, $http, $location) {
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.error_message = '';
  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data) {
      if (data.state === 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function() {
    console.log("called register function");
    $http.post('/auth/signup', $scope.user).success(function(data) {
      if (data.state === 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log("successfully registered");
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };
});
