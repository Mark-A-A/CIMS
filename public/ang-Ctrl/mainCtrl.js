var mainCtrl = angular.module('mainCtrl', ['ngAnimate', 'ngStorage']);

mainCtrl.controller("authController", function($scope, $rootScope, $http, $location, $stateParams, sharedProperties, $localStorage) {

  $rootScope.authenticated = false;
  $rootScope.current_user = " ";

  $scope.user = {
    user_id: '',
    username: '',
    password: ''
  };

  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data) {
      if (data.username) {

        $rootScope.authenticated = true;
        $rootScope.user_id = data._id;
        $rootScope.current_user = data.username;

        //Object for the service
        $rootScope.user = {
          user_id: data._id,
          username: data.username,
        };
        //Assign User Data to Service to share between controllers
        sharedProperties.setUser($rootScope.user);

        console.log("successfully Logged In  - Avengers Assemble");
        $location.path('/profile');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function() {
    $http.post('/auth/signup', $scope.user).success(function(data) {
       console.log('login');
      if (data.username) {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        console.log("successfully registered");
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      };
    });
  };

});
