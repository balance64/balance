angular.module('profile', [])

.controller('profileController', function($scope, Prof) {
	$scope.username = 'trace';
	Prof.getProfileInfo($scope.username).then(function(info) {
		$scope.info = info;
		console.log(info);
	});
});