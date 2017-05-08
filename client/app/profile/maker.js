angular.module('maker', [])

.controller('makerController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.username = $location.path().split('/')[2];
  console.log('$http: ', $http)
  $scope.postProfile = function() {

      $http.post('/profile', {sex: $scope.sex, height: $scope.height, age: $scope.age, weight: $scope.weight})
      	.then(function() {
      		console.log('posted!!!'); 
      		$location.path(`/users/${$scope.username}`);
      	})
      	.catch(function(){
      		console.log('not posted!! life sucks!!')
      	});
  }

}]);
