angular.module('AuthModule', []).factory('Auth',
  function($http, $location, formEncode, currentUser, redirectLogin) {
    var accessToken = '';
    this.accessToken = '';
    var signin = function(data) { 

      var config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      }
      var username = data.username;

      data = formEncode(data);
      return $http.post('/signin', data, config)
        .then(function(response) {
            if(response.data.success == false) {
              throw new Error();
            }
						currentUser.setUser(username, response.data.token);
            return username;
        })
        .then(function(username){
        	$location.path('/users/' + username);
        });
    }

    return {
      accessToken: accessToken,
      signin: signin
    }
  });
