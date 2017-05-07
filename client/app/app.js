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
	  console.log(currentUser);
	  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
	    console.log('$routeChangeStart MF: ', next.$$route.originalPath)
	    //if(next.$$route.originalPath === '/signup' || next.$$route.originalPath === '/login') {
	    if(next.$$route.originalPath === '/signup' || next.$$route.originalPath === '/login') {
	    	console.log('asdf');
	    	if(currentUser.user.loggedIn()) {
	    		console.log(JSON.stringify(currentUser));
	    		$location.path('/users/' + currentUser.user.username);
	    	} else return;
	    }
	    if (!currentUser.user.loggedIn()) {
	      console.log('is not authenticated ')
	      $location.path('/login');
	    }
	    if (next.$$route.originalPath.startsWith('/users/') && !next.$$route.originalPath.startsWith('/users/' + currentUser.user.username)) {
	    	$location.path('/users/' + currentUser.user.username);
	    }
	  });
	});