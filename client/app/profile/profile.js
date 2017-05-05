angular.module('profile', [])

.controller('profileController', function($scope, Prof, $location) {
	$scope.username = $location.path().split('/')[2];

	Prof.getProfileInfo($scope.username).then(function(info) {
		$scope.info = info[0];
	});
	
	$scope.form = true;
	$scope.calendar = false;
	$scope.graphs = false;
});