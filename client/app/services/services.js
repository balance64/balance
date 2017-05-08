angular.module('services',[])

.factory('Prof', function($http) {

	var getDateSelected = function(date) {
		console.log('gemo should fuck off!', date);
	};

	var getProfileInfo = function(user) {
		return $http({
			method: 'GET',
			url: '/basicInfo'
		}).then(function(result){
			console.log('================THIS ONE====>', result.data)
			return result.data;
		});
	};

	var getFood =function(user) {
		return $http({
			method: 'GET',
			url: '/foodHistory'
		}).then(function(result){
			return result.data;
		});
	};

	var getExercises =function(user) {
		return $http({
			method: 'GET',
			url: `/exerciseHistory`
		}).then(function(result){
			return result.data;
		});
	};

	var getWeight =function(user) {
		return $http({
			method: 'GET',
			url: `/weightHistory`
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
			// if(item === 'calendar') {
			// 	$(function(){
			// 		$('#calendar').fullCalendar()
			// 	});
			// }
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

	var onDayClick = function(day) {
		getWeight()
	}


	return {
		postWeight: postWeight,
		postFood: postFood,
		postExercise: postExercise,
		getDateSelected: getDateSelected,
		getProfileInfo: getProfileInfo,
		tabView: tabView,
		getFood: getFood,
		getExercises: getExercises,
		getWeight: getWeight,

		weightEvents: [],
		exerciseEvents: [],
		foodEvents: [],
		onDayClick: function() {
			getFood().then(function(res){
				this.foodEvents = res;
				console.log('foods ', res);
			});
			getExercises().then(function(res){
				this.exerciseEvents = res;
				console.log('exercises', res);
			});
			getWeight().then(function(res) {
				this.weightEvents = res;
				console.log('weights', res);
			});
		}
	};
});