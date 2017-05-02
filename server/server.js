var express = require('express');
var db = require('../db/index.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('../client'));

app.get('/theTruth', (req, res) => {
	db.query('SELECT * FROM users', function(err, results) {
		if (err) throw err;
		res.send(results);
		res.end();
	});
});

app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
