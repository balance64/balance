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


	var tabView = function(item) {
		var tabs = {
			greeting: false,
			weight: false,
			exercise: false,
			consumables: false,
			calendar: false,
			graphs: false
		}

		if(item) {
			tabs[item] = true;
		} else {
			tabs.greeting = true;
		}

		return tabs;
	};

	return {
		getProfileInfo: getProfileInfo,
		tabView: tabView
	};
});