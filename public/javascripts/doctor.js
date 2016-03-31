var app = angular.module('app', ['ngRoute']).run(function($rootScope,$http){

      $rootScope.authenticated = false;
      $rootScope.current_user = " ";

      $rootScope.logout = function(){
        $http.get('/auth/signout');

        $rootScope.authenticated = false;
        $rootScope.current_user = " ";
      };
 });

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
