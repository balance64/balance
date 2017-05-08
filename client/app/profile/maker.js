angular.module('maker', [])
//http request that creates a user in db with the basic info
.controller('makerController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.username = $location.path().split('/')[2];
  $scope.postProfile = function() {

      $http.post('/profile', {sex: $scope.sex, height: $scope.height, age: $scope.age, weight: $scope.weight})
      	.then(function() {
      		console.log('posted!!!'); //instead of this something could be done in the dom to 
                                    //alert the user about the completeness of the operation
      		$location.path(`/users/${$scope.username}`);
      	})
      	.catch(function(){
      		console.log('not posted!! life sucks!!') //idem
      	});
  }

}]);
