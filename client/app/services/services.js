angular.module('services',[])

.factory('Prof', function($http) {
	var getProfileInfo = function(user) {
		return $http({
			method: 'GET',
			url: '/basicInfo'
		}).then(function(result){
			console.log('=======================THIS ONE====>', result.data)
			return result.data;
		});
	};

	var getFood =function(user) {
		return $http({
			method: 'GET',
			url: `api/food/${user}`
		}).then(function(result){
			return result.data;
		});
	};

	var getExercises =function(user) {
		return $http({
			method: 'GET',
			url: `api/exercises/${user}`
		}).then(function(result){
			return result.data;
		});
	};

	var getWeight =function(user) {
		return $http({
			method: 'GET',
			url: `api/weight/${user}`
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

	var postWeight = function(weight) {
		return $http.post('/weight', {weight: weight});
	}
	
	var postExercise = function(exercise, calories, miles) {
		return $http.post('/exercise', {exercise: exercise, calories: calories, miles: miles});
	}

	var postFood = function(food, calories) {
		return $http.post('/food', {food: food, calories: calories});
	}

	return {
		postWeight: postWeight,
		postFood: postFood,
		postExercise: postExercise,

		getProfileInfo: getProfileInfo,
		tabView: tabView,
		getFood: getFood,
		getExercises: getExercises,
		getWeight: getWeight

	};
});