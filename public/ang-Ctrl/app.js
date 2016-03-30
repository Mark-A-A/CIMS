var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl']);

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
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html"
    });
});
