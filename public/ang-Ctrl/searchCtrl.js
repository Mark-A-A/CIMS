var searchCtrl = angular.module('searchCtrl', ['ngAnimate']);

searchCtrl.controller('searchBar', ['$scope', '$http', function($scope, $http) {
  $scope.label = 'Specialty';
  $scope.searchDoctors = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/specialties?limit=20&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      console.log(data.data);
      $scope.specialties = data.data;
    });
  };

  $scope.submitSearch = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&sort=rating-desc&skip=0&limit=1&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      console.log(data.data);
      $scope.doctors = data.data;
    });
  };
}]);
