var newsCtrl = angular.module('newsCtrl', ['ngAnimate']);

newsCtrl.controller('articleController', ['$scope', '$http', function($scope, $http) {
  $scope.articles = [];

  $http.get('/scraper').success(function(data){
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      //$scope.articles = data[i];
    };
  });
}]);
