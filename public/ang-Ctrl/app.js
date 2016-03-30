var doctorApp = angular.module('doctorApp', ['ui.router']);

doctorApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/main.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/register.html"
    });
});
