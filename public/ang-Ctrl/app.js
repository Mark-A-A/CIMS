var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl']).run(function($rootScope, $http) {

  $rootScope.authenticated = false;
  $rootScope.current_user = " ";

  $rootScope.signout = function() {
    console.log("Calling Angular logout");
    $http({
      method: 'GET',
      url: '/auth/signout'
    }).then(function successCallback(response) {
        console.log("Signout Successful");
        $rootScope.authenticated = false;
        $rootScope.current_user = {};
      }, function errorCallback(response) {
        console.log("Signout failed"+response);
    });
  };
});

doctorApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/main.html",
      controller: "ListController"
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: "authController"
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: "authController"
    });

});
