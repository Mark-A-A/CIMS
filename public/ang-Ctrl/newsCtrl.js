var newsCtrl = angular.module('newsCtrl', ['ngAnimate', 'ui.bootstrap']);

newsCtrl.controller('articleController', ['$scope', '$http', function($scope, $http) {
  $scope.articles = [];
  $scope.pageSize = 4;
  $scope.currentPage = 1;

  $http.get('/scraper').success(function(data) {
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      $scope.articles.push(data[i]);
    };
  });
}])
.filter('startFrom', function() {
  return function(data, start) {
    return data.slice(start);
  }
});


newsCtrl.controller('mdController', ['$scope', '$http', function($scope, $http) {
  $scope.links = [];

  $http.get('/webmd').success(function(data) {
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      $scope.links.push(data[i]);
    }
  });
}]);



