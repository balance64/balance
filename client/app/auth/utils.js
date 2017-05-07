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

.factory('currentUser', function() {

	var user = {
		username: "",
		token: "",
		loggedIn: function() {
			return this.token;
		}
	}

	return {
		user: user,
		setUser: function(username, token) {
			this.user.username = username;
			this.user.token = token;
		}
	};
})

.factory('addToken', function(currentUser, $q) {

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

.config(function($httpProvider) {
	$httpProvider.interceptors.push('addToken');
});