angular.module('profile', [])

.controller('profileController', ['$scope', 'Prof', '$location', 'currentUser', function($scope, Prof, $location, currentUser) {
	$scope.username = $location.path().split('/')[2];
  $scope.signout = function() {
    currentUser.user.signOut();
  }

	Prof.getProfileInfo($scope.username).then(function(info) {
		$scope.info = info;
	});


  /**EVENTS FIRED WHEN A CLICK TO THE CALENDAR OCCURRED AND AN HTTP REQUEST MODIFIED
  THE EXERCISE, FOOD OR WEIGHT ARRAYS**/
  $scope.$on('exerciseChange', function(e, stuff, day) {
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.exercises = stuff.filter((exer) => {
      return (''+new Date(exer.created_at)).slice(0, 15) === (''+day).slice(0,15);
    });
  })
  $scope.$on('foodChange', function(event, stuff, day) {
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.foods = stuff.filter((food) => {
      return (''+new Date(food.created_at)).slice(0, 15) === (''+day).slice(0,15);
    });
  })
  $scope.$on('weightChange', function(e, stuff, day) {
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.weights = stuff.filter((weight) => {
      return (''+new Date(weight.date)).slice(0, 15) === (''+day).slice(0,15);
    });
  })
  /**END OF EVENTS**/
  $scope.weights = [];
  $scope.foods = [];
  $scope.exercises = [];
 

	$scope.tabs = Prof.tabView();
/***POST SIMPLE STUFF***/
  $scope.postWeight = function() {
      Prof.postWeight($scope.weight).then(function() {
          $scope.info.weight = $scope.weight;
      }).then(()=>{
        $scope.weight = '';
      })
  }

  $scope.postExercise = function() {
      Prof.postExercise($scope.exercise, $scope.burned, 0)
          .then(() => {
              $scope.exercise = '';
              $scope.burned = '';
          });
  }

  $scope.postFood = function() {
      Prof.postFood($scope.food, $scope.consumed)
          .then(() => { 
              $scope.food = '';
              $scope.consumed = '';
          })
  }

  $scope.tabView = (item) => $scope.tabs = Prof.tabView(item);
}])

////CALENDAR
.directive('anything', function(Prof) {//TODO: make this 'calendar' instead of 'anything'
  return {
    restrict: 'AE',
    replace: true,
    link: function(scope, element, attrs) {
      angular.element(element).fullCalendar({

        dayClick: function(date, jsEvent, view) {
          Prof.onDayClick(new Date(date._d));
        }
      });
    }
  }
})


///GRAPH
.directive('graph', function(Prof) {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div></div>',
    link: function(scope, element, attrs) {
      Prof.getGraphData().then(function(graphData){
        scope.chart = google.charts;
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(drawBasic);
        function drawBasic() {

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'X');
          data.addColumn('number', 'Pounds');
          data.addRows( graphData );
          var options = {
            hAxis: {
              title: 'Days'
            },
            vAxis: {
              title: 'Weight'
            }
          };
          
          element[0].style = "width: 900px; height: 900px";
          var chart = new google.visualization.LineChart(element[0]);

          chart.draw(data, options);
          graphData = data;

          
        }
      });
      
    }
  }
})

