var newsCtrl = angular.module('newsCtrl', ['ngAnimate']);

newsCtrl.controller('articleController', ['$scope', '$http', function($scope, $http) {
  $scope.articles = [];

  $http.get('/scraper').success(function(data) {
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      $scope.articles.push(data[i]);
    }
  });
}]);

newsCtrl.controller('mdController', ['$scope', '$http', function($scope, $http) {
  $scope.links = [];

  $http.get('/webmd').success(function(data) {
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      $scope.links.push(data[i]);
    }
  });
}]);


