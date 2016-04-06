var searchCtrl = angular.module('searchCtrl', ['ngAnimate']);

searchCtrl.controller('searchBar', ['$scope', '$http', function($scope, $http) {
  $scope.searchDoctors = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/specialties?limit=20&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      console.log(data.data);
      $scope.specialties = data.data;
    });
  };

  $scope.submitSearch = function() {
    $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.zip).success(function(data) {

      $scope.userLat = data.results[0].geometry.location.lat;
      $scope.userLon = data.results[0].geometry.location.lng;
      console.log(data.results[0].geometry.location);
      $http.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + data.results[0].geometry.location.lat + '%2C' + data.results[0].geometry.location.lng + '%2C100&user_location=' + data.results[0].geometry.location.lat + '%2C' + data.results[0].geometry.location.lng + '&sort=best-match-desc&skip=0&limit=3&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
        console.log(data.data);
        $scope.doctors = data.data;
      });

    });

  };
}]);

searchCtrl.controller('doctorDetails', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  $http.get('https://api.betterdoctor.com/2016-03-01/doctors?location=nj-hoboken&user_location=40.500%2C77.413&sort=rating-desc&skip=0&limit=3&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
    console.log(data.data);
    $scope.details = data.data;
    $scope.whichItem = $stateParams.id;
  });

}]);
