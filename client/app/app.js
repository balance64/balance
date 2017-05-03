angular.module('balance',['ngRoute'])
	.config(function ('$routeProvider'){
		$routeProvider
			.when('/secrets', {
				template:,
				controller:
			})
			.otherwise('/', {
				template:,
				controller:
			});
	});