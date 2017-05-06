angular.module('balance',['ngRoute',
		'profile',
		'services',
		'login',
		'signup',
<<<<<<< a169a92b78685fad4d88c8fa18a4c36629ab9da4
		'home',
		'maker'
	])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
			.when('/maker/:username', {
				templateUrl: 'app/profile/maker.html',
				controller: 'makerController'
			})
=======
		'home'
	])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
>>>>>>> Add some pages and prettiness
			.when('/signup', {
				templateUrl: 'app/auth/signup.html',
				controller: 'signupController'
			})
			.when('/login', {
				templateUrl: 'app/auth/login.html',
				controller: 'loginController'
			})
			.when('/', {
				templateUrl: 'app/home/home.html',
				controller: 'homeController'
			})
			.when('/users/:username', {//eventually will be something like '/users/:username'
				templateUrl: 'app/profile/profile.html',
				controller: 'profileController'
			})
			.otherwise('/', {
				templateUrl: 'app/home/home.html',
				controller: 'homeController'
			});


	});