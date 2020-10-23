angular.module("helloWorldApp", ["ngRoute"]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "pages/home/home.html",
      controller: "HomeCtrl",
    });
  },
]);
