console.log('dddddddd');
angular.module('AuthModule', []).factory('Auth', function($http, $location) {
	var accessToken = "";
	var signin = function(data) {
		console.log('=====data: ', data)
		$http.post('/signin', data).then(function(response) {
			if(response.data.success === true) {
				var accessToken = response.data.token;	
				angular.module('balance').config(function($httpProvider){
					$httpProvider.interceptors.push({
						request: function(config) {
							config.headers['Authorization'] = 'Bearer ' + accessToken;
						}
					});
				});
				console.log('headers done');

				$location.path('/users/' + data.username + '/')
			} else {
				$location.path('/login');
			}
			
			


			console.log(response);
		})
	}

	return {
		accessToken: accessToken,
		signin: signin,
		signout: function() {
			this.accessToken = '';
		},
		isAuth: function() {
			return this.accessToken !== '';
		}
	}
});