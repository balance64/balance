angular.module('services',[])

.factory('Prof', function($http) {
	var getProfileInfo = function(user) {
		return $http({
			method: 'GET',
			url: `api/users/${user}`
		}).then(function(result){
			return result.data;
		});
	};

	return {
		getProfileInfo: getProfileInfo
	};
});