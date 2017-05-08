angular.module('services',[])

.factory('Prof', function($http, $rootScope) {

	var getGraphData = function() {
		//gets weight history ({weight, date} objects)
		return $http.get('/weightHistory')
		.then( (d) => {
			return d.data.map(da=>[da.date.toString().slice(8,10), da.weight]);
		})
		.catch((e) => {
			return []
		});
	}

	var getProfileInfo = function(user) {
		//returns a promise that resolves with the user's basic info
		return $http({
			method: 'GET',
			url: '/basicInfo'
		}).then(function(result){
			return result.data;
		});
	};

	var getFood =function(user) {
		//return promise with a list of foods
		return $http({
			method: 'GET',
			url: '/foodHistory'
		}).then(function(result){
			return result.data;
		});
	};

	var getExercises =function(user) {
		//return promise with a list of exercises
		return $http({
			method: 'GET',
			url: `/exerciseHistory`
		}).then(function(result){
			return result.data;
		});
	};

	var getWeight =function(user) {
		//promise that resolves with a weight history
		return $http({
			method: 'GET',
			url: `/weightHistory`
		}).then(function(result){
			return result.data;
		});
	};

	var tabView = function(item) {
		//if tabs.xxxx === false, it means that it is not visible
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


	//these functions add entries to db for the current user
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
		getGraphData: getGraphData,

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
		onDayClick: (function(day) {
			//function that populates the list of activities per day once a calendar cell
			//is clicked
			getFood().then(function(res){
				this.foodEvents = res;
				$rootScope.$broadcast('foodChange', res, day)
			});
			getExercises().then(function(res){
				this.exerciseEvents = res;
				$rootScope.$broadcast('exerciseChange', res, day)
			});
			getWeight().then(function(res) {
				this.weightEvents = res;
				$rootScope.$broadcast('weightChange', res, day)
			});
		}).bind(this)
	};
});