console.log('sddddd');

angular.module('balance',['ngRoute',
		'profile',
		'services',
		'login',
		'signup',
		'home',
		'maker',
		'AuthModule',
		'utilsModule'
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


	})
	.run(function ($rootScope, $location, currentUser) {
	  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
	    if(next.$$route.originalPath === '/signup' || next.$$route.originalPath === '/login') {
	    	if(currentUser.user.loggedIn()) {
	    		$location.path('/users/' + currentUser.user.username);
	    		//redirect to /users/username if the address is /login or /signup
	    	} else return;
	    }
	    if (!currentUser.user.loggedIn()) {
	      console.log('is not authenticated ')
	      $location.path('/'); //redirect to '/' if not authenticated
	    }
	    if (next.$$route.originalPath.startsWith('/users/') && !next.$$route.originalPath.startsWith('/users/' + currentUser.user.username)) {
	    	$location.path('/users/' + currentUser.user.username);
	    	//redirect to /users/:username if logged in but a wrong :username was provided
	    }
	  });
	});