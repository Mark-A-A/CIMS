<<<<<<< HEAD

=======
var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl','newsCtrl','CalendarCtrl2'])

.run(function($rootScope, $http) {
>>>>>>> afa5e622e467c34db0648e21393da93066266cd4

var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl', 'newsCtrl','CalendarCtrl2']);

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
    .state('calendar', {
      url: "/calendar",
      templateUrl: "partials/calendar2.html",
      controller: "KitchenSinkCtrl"
    });
});
