angular.module('login', [])

.controller('loginController', ['$scope', '$location', function($scope, $location) {
  $scope.goLogin = function() {
    $location.path(`/users/${$scope.username}`);
  };
}]);