var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl']).run(function($rootScope, $http) {

  $rootScope.authenticated = false;
  $rootScope.current_user = " ";

  $rootScope.logout = function() {
    $http.get('/auth/signout');

    $rootScope.authenticated = false;
    $rootScope.current_user = " ";
  };
});

doctorApp.config(function($stateProvider, $urlRouterProvider) {
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
      url: "/signup",
      templateUrl: "partials/register.html",
      controller: "authController"
    });
});
