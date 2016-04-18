<<<<<<< HEAD
var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl']).run(function($rootScope, $http) {
=======

var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl','newsCtrl','CalendarCtrl2'])

.run(function($rootScope, $http) {
>>>>>>> 3206cfbd7f8730bc4d6863296cd83401622dc75e

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
        "": {
          templateUrl: "partials/main.html",
          controller: "searchBar"
        },
        "results@home": {
          templateUrl: "partials/results.html",
          controller: "searchBar"
        },
        "map@home": {
          templateUrl: "partials/map.html",
          controller: "searchBar"
        }
      }
    })
    .state('news', {
      url: "/news",
      templateUrl: "partials/news.html",
      controller: ""
    })
    .state('doctors', {
      url: "/doctors/:name/:uid",
      views: {
        "": {
          templateUrl: "partials/dr-details.html",
          controller: "loadDetails"
        },
        "map@doctors": {
          templateUrl: "partials/map-single.html",
          controller: ""
        }
      },
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
    })
<<<<<<< HEAD
    .state('login-google', {
      url: "/google-login",
      templateUrl: "partials/google-login.html",
      controller: "authController"
    })
});
=======
    .state('calendar', {
      url: "/calendar",
      templateUrl: "partials/calendar2.html",
      controller: "KitchenSinkCtrl"
    });
});
>>>>>>> 3206cfbd7f8730bc4d6863296cd83401622dc75e
