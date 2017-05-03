angular.module('balance',['ngRoute'])
	.config(function ('$routeProvider'){
		$routeProvider
			.when('/secrets', {//eventually will be something like '/users/:username'
				template: profile.html,
				controller: profileController
			})
			.otherwise('/', {
				template: home.html,
				controller: homeCOntroller
			});
	});