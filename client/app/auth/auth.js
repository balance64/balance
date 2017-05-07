console.log('dddddddd');
angular.module('AuthModule', []).factory('Auth',
  function($http, $location, formEncode, currentUser, redirectLogin) {
    //var accessToken = localStorage"";
    var accessToken = '';
    var signin = function(data) { ///data.username, data.password
      //console.log('=====data: ', data)
      

      var config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      }
      var username = data.username;

      //nextUrl = nextUrl || '/users/' + username;

      data = formEncode(data);
      return $http.post('/signin', data, config)
        .then(function(response) {
            console.log('response: ====> ', response);
						currentUser.setUser(username, response.data.token);
            console.log(currentUser);
            return username;
        })
        .then(function(username){
        	redirectLogin.redirectAfterLogin(username);
        });
    }

    return {
      accessToken: accessToken,
      signin: signin,
      // signout: function() {
      //     this.accessToken = '';
      // },
      // isAuth: function() {
      //     return this.accessToken !== '';
      // }
    }
  });
