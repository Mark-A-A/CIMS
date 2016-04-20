var mainCtrl = angular.module('mainCtrl', ['ngAnimate']);



mainCtrl.controller("authController", function($scope, $rootScope, $http, $location, $stateParams, sharedProperties) {
  
  $scope.user = {
    user_id:  '',
    username: '',
    password: ''
  };

  $scope.error_message = '';

  $scope.login = function() {
    debugger
    console.log("stateParams" + $stateParams);
    $http.post('/auth/login', $scope.user).success( function (data) {
      debugger
      console.log("data...... "+ data);
      console.log("show the current user is...." + data.username);
      if (data.username) {


        $rootScope.authenticated = true;
        $rootScope.user_id = data._id
        $rootScope.current_user = data.username;
        
        //Object for the service
        $rootScope.user = {
          user_id: data._id,
          username: data.username,
        }

        //Assign User Data to Service to share between controllers
        sharedProperties.setUser($rootScope.user);

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

 


});
