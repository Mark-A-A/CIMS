var mainCtrl = angular.module('mainCtrl', ['ngAnimate']);

mainCtrl.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('public/javascripts/doctor-seed.json').success(function(data) {
    $scope.doctors = data;
    console.log(data);
  });
}]);
