var mainCtrl = angular.module('mainCtrl', ['ngAnimate']);

mainCtrl.controller("authController", function($scope, $rootScope, $http, $location) {
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.error_message = '';
  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data) {
      if (data.username) {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log("successfully Logged In");
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function() {
    $http.post('/auth/signup', $scope.user).success(function(data) {
      // console.log(data.user);
      if (data.username) {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log("successfully registered");
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };


  $scope.signout = function() {
    $http.get('/auth/logout').success(function(data) {
      console.log('i made it hee');
    });

  };
});
