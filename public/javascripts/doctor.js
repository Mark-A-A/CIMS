var app = angular.module('app', ['ngRoute']).run(function($rootScope,$http){

      $rootScope.authenticated = false;
      $rootScope.current_user = " ";

      $rootScope.logout = function(){
        $http.get('/auth/signout');

        $rootScope.authenticated = false;
        $rootScope.current_user = " ";
      }
 //});

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
   //the timeline display
   .when('/', {
    templateUrl: '/views/partials/main.html',
    controller: 'mainController'
   })
   //the login display
   .when('/login', {
    templateUrl:'/public/login.html',
    controller: 'authController'
   })
   //the signup display
   .when('/signup', {
    templateUrl:'register.html',
    controller:'authController'
   });
}]);

app.controller('mainController', function($scope){

  //Enter main content

});

app.controller("authController",function($scope, $rootScope, $http, $location){
  $scope.user = {username:'',password:''};
  $scope.error_message ='';

  $scope.login = function (){
    $http.post('/auth/login', $scope.user).success(function(data){

      if(data.state === 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
      console.log("called register function");

      $http.post('/auth/signup', $scope.user).success(function(data){
        if(data.state === 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.username;
          console.log("successfully registered");
          $location.path('/');
        }else {
          $scope.error_message = data.message;
        }
    });
  };
});

});
