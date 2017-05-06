console.log('sddddd');

angular.module('balance',['ngRoute',
		'profile',
		'services',
		'login',
		'signup',
		'home',
		'maker',
		'AuthModule'
	])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider
			.when('/maker/:username', {
				templateUrl: 'app/profile/maker.html',
				controller: 'makerController'
			})
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