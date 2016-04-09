var newsCtrl = angular.module('newsCtrl', ['ngAnimate']);

newsCtrl.controller("newsCtrl", function($scope, $http){
  $http.get('').success(function(data){
    /// display data from the route that scrapes data
  });
});
