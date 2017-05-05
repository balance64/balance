angular.module('balance',['ngRoute',
		'profile',
		'services'
	])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
			.when('/users/trace', {//eventually will be something like '/users/:username'
				templateUrl: 'app/profile/profile.html',
				controller: 'profileController'
			})
			.otherwise('/', {
				templateUrl: 'app/home/home.html',
				controller: 'homeController'
			});

			
	});