angular.module('login', [])

.controller('loginController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
  $scope.goLogin = function() {
  	if ($scope.username === '' || $scope.password === '') {
  	} else {
  		Auth.signin({username: $scope.username, password: $scope.password})
  		.catch(function(e){
  			$scope.username = ''; 
  			$scope.password = '';
  		});	
  	}
  };
}]);