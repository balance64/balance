angular.module('profile', [])

.controller('profileController', ['$scope', 'Prof', '$location', 'currentUser', function($scope, Prof, $location, currentUser) {
	$scope.username = $location.path().split('/')[2];
  console.log('cur user ', currentUser)
  $scope.signout = function() {
    currentUser.user.signOut();
  }

	Prof.getProfileInfo($scope.username).then(function(info) {
		$scope.info = info[0];
	});
  $scope.hello = 'fuckhead';
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
  $scope.tabView = (item) => $scope.tabs = Prof.tabView(item);
}])

.directive("calendar", function(Prof) {
    return {
        restrict: "E",
        transclude: true,
        templateUrl: "app/profile/calendar.html",
        scope: {
            selected: '='
        },

        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment().utc());
            scope.month = scope.selected.clone();

            var start = scope.selected.clone();
            start.date(1);
            // console.log(scope.selected);
            _removeTime(start.day(0));

            Prof.getProfileInfo('adam').then(function(info) {scope.calInfo = info[0]});

            _buildMonth(scope, start, scope.month);
            scope.select = function(day) {
                scope.selected = day.date;
            };

            // Prof.getProfileInfo(scope.username).then(function(info) {
            //   scope.info = info[0];
            // });

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1)).date(1);
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };  

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});