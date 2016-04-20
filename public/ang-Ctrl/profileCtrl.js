var profileController = angular.module('doctorApp');

profileController.controller("ProfileViewCtrl", function($scope, sharedProperties) {
  console.log("did something with profile Angular");
  var test = sharedProperties.getUser();
  console.log(sharedProperties);
  debugger
});