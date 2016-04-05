var calendarCtrl = angular.module('calendarCtrl', ['ngAnimate']);

calendarCtrl.controller('GetCalendar', ['$scope', '$http', function($scope, $http) {
  $scope.launchCalendar = function(){
    console.log('Ivan');
  };
}]);
