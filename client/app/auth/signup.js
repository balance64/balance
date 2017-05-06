angular.module('signup',[])

.controller('signupController', ['$scope', '$location', function($scope, $location) {
  $scope.goMake = function() {
    $location.path(`/maker/${$scope.username}`)
  }
}]);