angular.module('signup',[])

.controller('signupController', ['$scope', '$location', '$http', 'Auth', 
    function($scope, $location, $http, Auth) {
  console.log(Auth);
  $scope.goMake = function() {
  	var signInData = {username: $scope.username, password: $scope.password};
  	$http.post('/signup', signInData)
  		.then(function(response) {
  			console.log(response);
  			if(!response.data.success) {
  				console.log('error. duplicate thing')
  			} else {
  				Auth.signin(signInData);
  			}
  		});

    // .then(function(){
    // 	$location.path(`/maker/${$scope.username}`);
    // });
  }
}]);