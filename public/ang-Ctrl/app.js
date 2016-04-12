var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl', 'newsCtrl']).run(function($rootScope, $http) {

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
      console.log("Signout failed" + response);
    });
  };
});

doctorApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      views: {
        "":{
          templateUrl: "partials/main.html",
          controller: "searchBar"
        },
        "results@home":{
          templateUrl: "partials/results.html",
          controller: "searchBar"
        },
        "map@home":{
          templateUrl: "partials/map.html",
          controller: "searchBar"
        }
      }
    })
    .state('news',{
      url: "/news",
      templateUrl: "partials/news.html",
      controller: ""
    })
    .state('doctors',{
      url: "/doctors/:uid",
      templateUrl: "partials/dr-details.html",
      controller: "loadDetails"
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
