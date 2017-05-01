var express = require('express');
var db = require('../db/index.js');

var app = express();

app.use(express.static('../client'));

app.get('/theTruth', (req, res) => {
	db.query('SELECT * FROM users', function(err, results) {
		if (err) throw err;
		res.send(results);
		res.end();
	});
});

app.listen(4568, function() {
  console.log('listening on 4568...');
})