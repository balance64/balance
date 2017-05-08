angular.module('utilsModule', [])

.factory('formEncode', function() {
	//encode data object in the right format
	return function(data) {
		var pairs = []; //stored momentarily in an array for efficiency
		for(var name in data) {
			pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		}
		return pairs.join('&').replace(/%20/g, '+');
	};
})

.factory('currentUser', function($window) {

	var user = {
		///on init, get username and password from localStorage if possible 
		///to allow reloading of the page
		username: $window.localStorage.getItem('balance.username') || "",
		token: $window.localStorage.getItem('balance.token') || "",
		loggedIn: function() {
			//this should be consistent: if there is a user logged in, token and 
			//username should be set, otherwise they should be empty strings
			return this.token !== '' && this.username !== '';
		},
		signOut: function() {
			this.token = '';
			this.username = '';
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
	//interceptors for outgoing http requests
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

.factory('redirectLogin', function($q, $location, currentUser) {
	///if a user has to login, this function ensures that after being redirected to
	///login and successfully logged in, the user is redirected to the page he/she
	///originally intended to visit (said address is stored in path)
	var path;

	var responseError = function(response) {
		currentUser.user.signOut();
		if(path != '/signin')
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
	//add interceptors
	$httpProvider.interceptors.push('addToken');
	$httpProvider.interceptors.push('redirectLogin')
});