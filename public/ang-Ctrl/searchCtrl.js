var searchCtrl = angular.module('searchCtrl', ['ngAnimate']);

searchCtrl.controller('loadSpecialty', ['$rootScope', '$http', function($rootScope, $http) {
  $rootScope.loadList = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/specialties?limit=10&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      $rootScope.specialties = data.data;
    });
  };
  $rootScope.loadList();
}]);

searchCtrl.controller('searchBar', ['$scope', '$http', '$rootScope', '$stateParams', function($scope, $http, $rootScope, $stateParams) {
  $scope.submitSearch = function() {
    console.log($rootScope.specialty);
    $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.zip).success(function(data) {
      $rootScope.userSearch = data.results[0].geometry.location.lat + '%2C' + data.results[0].geometry.location.lng;
      $rootScope.userSpecialty = 'query=' + $rootScope.specialty.uid + '&';
      if ($scope.specialty === undefined) {
        $http.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + $rootScope.userSearch + '%2C100&user_location=' + $rootScope.userSearch + '&sort=best-match-desc&skip=0&limit=3&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
          console.log(data.data);
          $scope.doctors = data.data;
        });
      } else {
        $http.get('https://api.betterdoctor.com/2016-03-01/doctors?' + $rootScope.userSpecialty + 'location=' + $rootScope.userSearch + '%2C100&user_location=' + $rootScope.userSearch + '&sort=best-match-desc&skip=0&limit=3&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
          console.log(data.data);
          $scope.doctors = data.data;
        });
      }
    });
  };

  $scope.loadDetails = function() {
    $http.get('https://api.betterdoctor.com/2016-03-01/doctors?' + $rootScope.userSpecialty + 'location=' + $rootScope.userSearch + '%2C100&user_location=' + $rootScope.userSearch + '&sort=best-match-desc&skip=0&limit=3&user_key=c77db2625ba3d0debf3e9be3b74158bd').success(function(data) {
      console.log('i made it');
      $scope.details = data.data;
      $scope.whichItem = $stateParams.id;
    });
  };
}]);
