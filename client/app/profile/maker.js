angular.module('maker', [])

.controller('makerController', ['$scope', '$location', function($scope, $location) {
  $scope.username = $location.path().split('/')[2];
  $scope.goLogin = function() {
    $location.path(`/users/${$scope.username}`)
  }
}]);
