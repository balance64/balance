angular.module('utilsModule', [])

.factory('formEncode', function() {
	return function(data) {
		var pairs = [];
		for(var name in data) {
			pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		}
		return pairs.join('&').replace(/%20/g, '+');
	};
})

.factory('currentUser', function($window) {

	var user = {
		username: $window.localStorage.getItem('balance.username') || "",
		token: $window.localStorage.getItem('balance.token') || "",
		loggedIn: function() {
			//console.log(this.token);
			return this.token !== '' && this.username !== '';
		},
		signOut: function() {
			this.token = '';
			$window.localStorage.setItem('balance.token', '');
			$window.localStorage.setItem('balance.username', '');
		}
	};

	// if(this.username === '' || this.token === '') {
	// 		token = '';
	// 		$window.localStorage.getItem('balance.token', '');
	// 	}

	return {
		user: user,
		setUser: function(username, token) {
			this.user.username = username;
			this.user.token = token;
			$window.localStorage.setItem('balance.token', token);
			$window.localStorage.setItem('balance.username', username);
		}
	};
})

.factory('addToken', function(currentUser, $q) { ///interceptor

	var request = function(config) {
		if(currentUser.user.loggedIn()) {
			config.headers.Authorization = "Bearer " + currentUser.user.token;
		}
		return $q.when(config);
	};

	return {
		request: request
	}
})

.factory('redirectLogin', function($q, $location) {

	var path;

	var responseError = function(response) {
		path = $location.path();
		if(response.status === 401) {
			$location.path('/login');
		}
		return $q.reject(response);
	}

	var redirectAfterLogin = function(username) {
		$location.path(path || '/users/'+username);
	}

	return {
		responseError: responseError,
		redirectAfterLogin: redirectAfterLogin
	}
})

.config(function($httpProvider) {
	$httpProvider.interceptors.push('addToken');
});