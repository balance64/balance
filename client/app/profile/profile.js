angular.module('profile', [])

.controller('profileController', ['$scope', 'Prof', '$location', 'currentUser', function($scope, Prof, $location, currentUser) {
  $scope.signout = function() {
    currentUser.user.signOut();
  }

	Prof.getProfileInfo(currentUser).then(function(info) {
		$scope.info = info;
	});

//When you click a date on the calendar the info attached to that date will be shown
//we are slicing because we are lazy and have more important things to do right now
//and we can't filter for exact milliseconds.  itll only start to be a problem next year.
  $scope.$on('exerciseChange', function(e, stuff, day) {
//For some reason the moment is one day behind, the internet says its a date format problem.  I entrust you to find out yourself
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.exercises = stuff.filter((exer) => {
      return (''+new Date(exer.created_at)).slice(0, 15) === (''+day).slice(0,15);
    });
  });
  $scope.$on('foodChange', function(event, stuff, day) {
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.foods = stuff.filter((food) => {
      return (''+new Date(food.created_at)).slice(0, 15) === (''+day).slice(0,15);
    });
  });
  $scope.$on('weightChange', function(e, stuff, day) {
    day = new Date(day.getTime() + 1000 * 60 * 60 * 24)
    $scope.weights = stuff.filter((weight) => {
      return (''+new Date(weight.date)).slice(0, 15) === (''+day).slice(0,15);
    });
  });

  $scope.weights = [];
  $scope.foods = [];
  $scope.exercises = [];
 

	$scope.tabs = Prof.tabView();
  $scope.tabView = (item) => $scope.tabs = Prof.tabView(item);

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

}])
//"Custom directives are used in AngularJS to extend the functionality of HTML"
//it is the angular way to stick jquery plugins in custom directives it is both 
//segregation and allows for being made on document ready automatic.  We originally
//had this working in the Prof factory though (didn't feel angular).
.directive('anything', function(Prof) {
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
          //the frist number is weeks the second number is pounds
          data.addRows(
            //[['michael', 0], ['and', 4], ['trace', 6], ['are', 13], ['good', 18], ['suckers', 25]]
            graphData
          );
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

