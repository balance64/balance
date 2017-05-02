const config = require('../db/knexfile.js')['development'];
const knex = require('knex') (config);

var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('../client'));

app.get('/secrets', (request, response) => {
  knex.select().from('users')
          .then(function(secrets) {
          	console.log('fetching tg');
            response.status(200).json(secrets);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});


// app.get('/theTruth', (req, res) => {
// 	db.query('SELECT * FROM users', function(err, results) {
// 		if (err) throw err;
// 		res.send(results);
// 		res.end();
// 	});
// });

app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
