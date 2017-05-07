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

app.use(function(req, res, next){
  console.log('req.headers: ==================>', req.headers);
  next();
})

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

app.get('/basicInfo', function(req, res) {
  knex('users').select().where({username: req.user}).then(function(results){
    res.status(200).json(results[0]); //for testing try 'adam' instead of req.user
  });
});

app.get('/foodHistory', function(req, res) {
  knex.from('foods').innerJoin('users', 'users.id', 'foods.user_id')
  .select('food', 'brand', 'ammount', 'calories').where({'users.username': req.user})
  .then(function(results){
    res.status(200).json(results);
  }).catch(function(error){
    res.status(500).json(error);
  })
});

app.get('/exerciseHistory', function(req, res) {
  knex.from('exercises').innerJoin('users', 'users.id', 'exercises.user_id')
        .select().where({'users.username': req.user})
        .then(function(results){
          res.status(200).json(results);
        }).catch(function(err){
          res.status(500).json(err);
        });
});



app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
