const config = require('../db/knexfile.js')['development'];
const knex = require('knex') (config);
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 4050));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



require('./auth/auth.js')(app, knex)



app.get('/', function(req, res) {
    //res.send('========================================================authentication passed')
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});
app.use(express.static(__dirname + '/../client'));
app.get('/api/users/:username', (request, response) => {
  knex.select().from('users').where({username: request.params.username})
          .then(function(secrets) {
          	console.log('fetching tg');
            response.status(200).json(secrets);
          })
          .catch(function(error) {
            console.error('somethings wrong with db')
          });
});


app.get('/test', function(req, res) {
  //res.send('asdf');
  res.send(JSON.stringify('sss' + req.user + 'sss') );
})

app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
