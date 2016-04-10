var newsCtrl = angular.module('newsCtrl', ['ngAnimate']);

newsCtrl.controller('loadArticles', ['$scope', '$http', function($scope, $http) {
  $http.get('/scraper').success(function(response){
    $scope.articles = response;
  });
}]);
