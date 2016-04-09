var newsCtrl = angular.module('newsCtrl', ['ngAnimate']);

newsCtrl.controller("", function($scope, $http){
  $http.get('/(route)').success(function(data){
    /// display data from the route that scrapes data
  });
});
