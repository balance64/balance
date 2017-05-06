angular.module('maker', [])

.controller('makerController', ['$scope', '$location', function($scope, $location) {
<<<<<<< 2705c1a7ee95b7ff99924253672eb19a001ccadb
  $scope.username = $location.path().split('/')[2];
  $scope.goLogin = function() {
    $location.path(`/users/${$scope.username}`)
  }
=======
  
>>>>>>> add profile setup
}]);
