const config = require('../db/knexfile.js')['development'];
const knex = require('knex') (config);
const path = require('path');
var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 4050));

app.use(express.static('../client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/api/users', (request, response) => {
  knex.select().from('users')
          .then(function(secrets) {
          	console.log('fetching tg');
            response.status(200).json(secrets);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});


app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
