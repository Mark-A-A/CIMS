var searchCtrl = angular.module('searchCtrl', ['ngAnimate', 'ngMap']);

searchCtrl.controller('loadSpecialty', ['$rootScope', '$http', function($rootScope, $http) {
  $rootScope.loadList = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/specialties?&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      $rootScope.specialties = data.data;
    });
  };
  $rootScope.loadList();
}]);

searchCtrl.controller('sideNavCtrl', ['$scope', '$http', '$stateParams', 'NgMap', function($scope, $http, NgMap) {
  $scope.showNav = false;
  $scope.activeNav = function() {
    $scope.showNav = !$scope.showNav;
  };

  $scope.showFullSearch = false;
  $scope.activeSearch = function() {
    $scope.showNav = !$scope.showNav;
    $scope.showFullSearch = !$scope.showFullSearch;
  };

  $scope.getLocation = function() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
    function onPositionUpdate(position) {
      $scope.geolat = position.coords.latitude;
      $scope.geolng = position.coords.longitude;
      console.log(position);
    }
  };
  $scope.getLocation();
  $scope.fullSearchSubmit = function() {

    $scope.showFullSearch = !$scope.showFullSearch;
    $http.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + $scope.fullScInput + '&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&sort=best-match-desc&skip=0&limit=2&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      console.log(data.data);
      $scope.showMap = true;
      $scope.doctors = data.data;
    });
    $scope.fullScInput = "Search";
  };
}]);

searchCtrl.controller('searchBar', ['$scope', '$http', '$rootScope', '$stateParams', 'NgMap', function($scope, $http, $rootScope, $location, NgMap) {
  NgMap.getMap().then(function(map) {
    $rootScope.map = map;
  });

  $scope.submitSearch = function() {
    if ($scope.sortBy === undefined) {
      $scope.sortBy = 'distance-asc';
    }
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.zip).success(function(data) {
      $scope.userLat = data.results[0].geometry.location.lat;
      $scope.userLon = data.results[0].geometry.location.lng;
      $rootScope.userSearch = data.results[0].geometry.location.lat + '%2C' + data.results[0].geometry.location.lng;
      if ($scope.specialty === undefined) {
        $http.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + $rootScope.userSearch + '%2C10&user_location=' + $rootScope.userSearch + '&sort=' + $scope.sortBy + '&skip=0&limit=10&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
          $scope.showMap = true;
          $scope.doctors = data.data;
        });
      } else {
        $rootScope.userSpecialty = 'query=' + $rootScope.specialty.uid + '&';
        $http.get('https://api.betterdoctor.com/2016-03-01/doctors?' + $rootScope.userSpecialty + 'location=' + $rootScope.userSearch + '%2C10&user_location=' + $rootScope.userSearch + '&sort=' + $scope.sortBy + '&skip=0&limit=10&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
          $scope.showMap = true;
          $scope.doctors = data.data;
        });
      }
    });


  };
}]);

searchCtrl.controller('loadDetails', ['$scope', '$http', '$stateParams', 'NgMap', function($scope, $http, $stateParams, NgMap) {
  console.log($stateParams);
  $scope.drIdentifier = $stateParams.uid;
  $http.get('https://api.betterdoctor.com/2016-03-01/doctors/' + $scope.drIdentifier + '?user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
    console.log(data.data);
    $scope.singleDr = data.data;
  });
}]);
