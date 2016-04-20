var mainCtrl = angular.module('mainCtrl', ['ngAnimate']);



mainCtrl.controller("authController", function($scope, $rootScope, $http, $location, $stateParams, sharedProperties) {
  
  $scope.user = {
    username: '',
    password: ''
  };

  $scope.error_message = '';

  $scope.login = function() {
    //debugger
    console.log("stateParams" + $stateParams);
    $http.post('/auth/login', $scope.user).success( function (data) {
      //debugger
      console.log("data...... "+ data);
      console.log("show the current user is...." + data.username);
      if (data.username) {


        $rootScope.authenticated = true;
        $rootScope.user_id = data._id
        $rootScope.current_user = data.username;
        sharedProperties.setUser(data.username);
        
        console.log("successfully Logged In");
        $location.path('/');
        // $location.path('/profile');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function() {
    $http.post('/auth/signup', $scope.user).success( function (data) {
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
    console.log("Calling Angular logout");
    // $http.post('/auth/signout');
    $http.get('/auth/signout').success(function(data) {
      console.log("Signout Successful" + data);
    }).error(function(error) {
      console.log("logout error" + error);
    });
    $rootScope.authenticated = false;
    $rootScope.current_user = {};


  };


});
