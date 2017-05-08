angular.module('profile', [])

.controller('profileController', ['$scope', 'Prof', '$location', 'currentUser', function($scope, Prof, $location, currentUser) {
	$scope.username = $location.path().split('/')[2];
  console.log('cur user ', currentUser)
  $scope.signout = function() {
    currentUser.user.signOut();
  }

	Prof.getProfileInfo($scope.username).then(function(info) {
		$scope.info = info;
	});
  
  // Prof.getFood($scope.username).then(function(info) {
  //   $scope.foods = food;
  // });

  // Prof.getExercises($scope.username).then(function(info) {
  //   $scope.exerses = drink;
  // });

  // Prof.getWeight($scope.username).then(function(info) {
  //   $scope.weight = drink;
  // });
	$scope.tabs = Prof.tabView();

  $scope.postWeight = function() {
      //$scope.weight
      Prof.postWeight($scope.weight).then(function() {
          $scope.info.weight = $scope.weight;
      })
  }

  $scope.postExercise = function() {
      Prof.postExercise($scope.exercise, $scope.burned, 0)
          .then(() => {
              $scope.exercise = '';
              $scope.burned = '';
              console.log('exercise posted in a satisfatorily way')
          });
  }

  $scope.postFood = function() {
      Prof.postFood($scope.food, $scope.consumed)
          .then(() => { 
              $scope.food = '';
              $scope.consumed = '';
              console.log('food posted successfully!!')
          })
  }

  $scope.tabView = (item) => $scope.tabs = Prof.tabView(item);
}])

.directive('anything', function(Prof) {
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, element, attrs) {
      angular.element(element).fullCalendar({

        dayClick: function(date, jsEvent, view) {
          Prof.onDayClick();
        }
      });
    }
  }
})

