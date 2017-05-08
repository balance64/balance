var passport = require('passport');  
var config = require('./config.js');  
var BearerStrategy = require('passport-http-bearer').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = function(app, knex) {
	passport.use(new BearerStrategy(function(token, cb) {

		jwt.verify(token, config.key, function(err, decoded) {
			if(err) {
				return cb(null, false);
			}
			console.log('decoded: ', decoded);
			cb(null, decoded.username, {scope: 'all'});
		});
	}));


	//curl --data "username=guillermo&password=abcdef" http://localhost:4050/signup
	app.post('/signup', function(req, res) {
		//username and password in req.body
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			if(err) {
				res.status(500).send('error hashing');
			} else {
				knex('authentications').insert({username: req.body.username, password: hash})
					.then(function(result){
						res.json({'success': true, message: 'ok'});
					}).catch(function(error){
						res.json({'success': false, message: error});
					})
			}
		});
	});

	app.post('/signin', function(req, res) {
		knex('authentications').select('password').where({username: req.body.username})
		.then(function(password) {
			password = password[0].password;
			//res.send(password);
			console.log(req.body);
			console.log(password)
			bcrypt.compare(req.body.password, password, function(err, response) {
				if(err) {
					res.status(401).json({success: false, message: err});
				} else {
					console.log('config key: ', config);
					var token = jwt.sign(req.body, config.key, {expiresIn: '1h'}); 
					console.log('generated token: ', token);
					res.json({success: true, message: 'ok', token: token});
				}
			});
		}).catch(function(error) {
			res.json({success: false, message: error});
		});
	});


	///here specify the routes that need protection 
	//app.use('/', passport.authenticate('bearer', {session: false }));
	app.use('/test', passport.authenticate('bearer', {session: false }));
	app.use('/foodHistory', passport.authenticate('bearer', {session: false }));
	app.use('/exerciseHistory', passport.authenticate('bearer', {session: false }));
	app.use('/weightHistory', passport.authenticate('bearer', {session: false }));
	app.use('/basicInfo', passport.authenticate('bearer', {session: false }));
	app.use('/profile', passport.authenticate('bearer', {session: false }));
	app.use('/weight', passport.authenticate('bearer', {session: false }));
	app.use('/food', passport.authenticate('bearer', {session: false }));
	app.use('/exercise', passport.authenticate('bearer', {session: false }));
}


////curl -v -H "Authorization: Bearer 123456789" http://localhost:4050