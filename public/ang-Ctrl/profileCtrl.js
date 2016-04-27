var profileController = angular.module('doctorApp');
// debugger

profileController.controller("ProfileViewCtrl", function($scope, sharedProperties) {
  // debugger
  console.log("did something with profile Angular");
   console.log("sharedProperties:"+ sharedProperties)
  $scope.user  = sharedProperties.getUser();
  console.log($scope.user);

});
