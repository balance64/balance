angular.module('balance',['ngRoute'])
	.config(function ('$routeProvider'){
		$routeProvider
			.when('/secrets', {//eventually will be something like '/users/:username'
				template: '/app/profile/profile.html',
				controller: 'profileController'
			})
			.otherwise('/', {
				template: '/app/home/home.html',
				controller: 'homeCOntroller'
			});
	});