angular.module("helloWorldApp", ["ngRoute"]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "./home.html",
      controller: "HomeCtrl",
    });
  },
]);
