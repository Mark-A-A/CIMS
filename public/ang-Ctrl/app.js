var doctorApp = angular.module('doctorApp', ['ui.router', 'mainCtrl', 'searchCtrl', 'newsCtrl','timerCtrl', 'CalendarCtrl2']);

doctorApp.service('sharedProperties', function() {
  var user = 'test string value';

  return {
    getUser: function() {
      return user;
    },
    setUser: function(value) {
      user = value;
    }
  };
});

doctorApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/landing.html",
      controller: "loadClock"
    })
    .state('search', {
      url: "/search/:query",
      views: {
        "": {
          templateUrl: "partials/fullSearch.html",
          controller: "searchBar"
        },
        "advance@search": {
          templateUrl: "partials/main.html",
          controller: "searchBar"
        },
        "results@search": {
          templateUrl: "partials/results.html",
          controller: "searchBar"
        },
        "map@search": {
          templateUrl: "partials/map.html",
          controller: "searchBar"
        },
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
        },
        "calendar@doctors": {
          templateUrl: "partials/calendar.html",
          controller: "KitchenSinkCtrl"
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
    // .state('calendar', {
    //   url: "/calendar",
    //   templateUrl: "partials/calendar.html",
    //   controller: "KitchenSinkCtrl"
    // })
    .state('profile', {
      url: "/profile/:user_id/:user_name",
      templateUrl: "partials/profile.html",
      controller: "ProfileViewCtrl"
    });

});
