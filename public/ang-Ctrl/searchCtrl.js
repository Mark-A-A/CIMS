var searchCtrl = angular.module('searchCtrl', ['ngAnimate', 'ngMap']);

//REQUEST LIST FROM API FOR DOCTOR SPECIALTIES
searchCtrl.controller('loadSpecialty', ['$rootScope', '$http', function($rootScope, $http) {
  $rootScope.loadList = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/specialties?&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      $rootScope.specialties = data.data;
    });
  };
  $rootScope.loadList();
}]);

//SIDENAV CONTROLLER TO HANDLE LOGIC FOR TOGGLING VIEW & HANDLING GEO LOCATION W/FULL SEARCH
searchCtrl.controller('sideNavCtrl', ['$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state) {
  $scope.getLocation = function() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

    function onPositionUpdate(position) {
      $rootScope.userLat = position.coords.latitude;
      $rootScope.userLon = position.coords.longitude;
      $rootScope.geoCoord = $rootScope.userLat + '%2C' + $rootScope.userLon;
    }
  };
  $scope.showNav = false;
  $scope.activeNav = function() {
    $scope.showNav = !$scope.showNav;
  };

  $rootScope.showFullSearch = false;
  $scope.activeSearch = function() {
    $state.go($state.current, {}, {reload: true});
    if ($rootScope.showFullSearch === false) {
      $scope.getLocation();
    }
    $scope.showNav = !$scope.showNav;
    $rootScope.showFullSearch = !$rootScope.showFullSearch;
  };
}]);

//REQUEST FOR ADVANCED SEARCH AND SORT INFORMATION PROVIDED BY USER
searchCtrl.controller('searchBar', ['$scope', '$http', '$rootScope', '$stateParams', 'NgMap', function($scope, $http, $rootScope, $location, NgMap, $stateParams) {
  NgMap.getMap().then(function(map) {
    $rootScope.map = map;
  });

  $scope.submitSearch = function() {
    if ($rootScope.showFullSearch) {
      $rootScope.showFullSearch = !$rootScope.showFullSearch;
      $http.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + $scope.fullScInput + '&location=' + $rootScope.geoCoord + '%2C100&user_location=' + $rootScope.geoCoord + '&sort=distance-asc&skip=0&limit=8&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
        $scope.showMap = true;
        $scope.doctors = data.data;
      });
    } else {
      if ($scope.sortBy === undefined) {
        $scope.sortBy = 'distance-asc';
      }
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.zip).success(function(data) {
        $rootScope.userLat = data.results[0].geometry.location.lat;
        $rootScope.userLon = data.results[0].geometry.location.lng;
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
    }
  };
}]);

//REQUEST FOR EACH DOCTOR PAGE USING uid AS PARAM
searchCtrl.controller('loadDetails', ['$scope', '$http', '$stateParams', 'NgMap', function($scope, $http, $stateParams, NgMap) {
  $scope.drIdentifier = $stateParams.uid;
  $http.get('https://api.betterdoctor.com/2016-03-01/doctors/' + $scope.drIdentifier + '?user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
    $scope.singleDr = data.data;
  });
}]);
