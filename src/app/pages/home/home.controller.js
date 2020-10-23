angular.module("helloWorldApp").controller("HomeCtrl", [
  "$scope",
  function ($scope) {
    $scope.message = "I am a message from the home controller";
  },
]);
