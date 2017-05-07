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
// app.get('/api/users/:username', (request, response) => {
//   knex.select().from('users').where({username: request.params.username})
//           .then(function(secrets) {
//           	console.log('fetching tg');
//             response.status(200).json(secrets);
//           })
//           .catch(function(error) {
//             console.error('somethings wrong with db')
//           });
// });


app.get('/test', function(req, res) {
  //res.send('asdf');
  res.send(JSON.stringify('sss' + req.user + 'sss') );
})

app.get('/basicInfo', function(req, res) {
  //console.log('req basic info of ===============', req.user);
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
  console.log('======================', req.user);
  knex.from('exercises').innerJoin('users', 'users.id', 'exercises.user_id')
        .select().where({'users.username': req.user})
        .then(function(results){
          res.status(200).json(results);
        }).catch(function(err){
          res.status(500).json(err);
        });
});

// app.post('/weight', function(req, res) {
//   knex()
// });

//curl --data "username=333&password=333" http://localhost:4050/signin
//curl -v -H "Authorization: Bearer 123456789" --data "sex=male&height=176&weight=200" http://localhost:4050/profile

app.post('/profile', function(req, res) {
  var sex = req.body.sex;
  var weight = req.body.weight;
  var height = req.body.height;
  var username = req.user;
  knex('users').insert({sex: sex, weight: weight, height: height, username:username})
    .then(function(){
      res.send({success: true, message: 'ok'});
    })
})

//curl --data "username=333&password=333" http://localhost:4050/signin
//curl -v -H "Authorization: Bearer 123456789" --data "weight=222" http://localhost:4050/weight
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjMzMyIsInBhc3N3b3JkIjoiMzMzIiwiaWF0IjoxNDk0MTgyMzY5LCJleHAiOjE0OTQxODU5Njl9.fGOcnBjfRFC3K9EAOrJt7Z-6C7aLl0JUYAgZNnsFrus
app.post('/weight', function(req, res) {
  var username = req.user; 
  console.log('=====================> ',username)
  var weight = req.body.weight;
  knex('users').select('id').where({username: username})
    .catch(function(err) {
      res.status(404).send();
    })
    .then(function(result) {
      console.log('==============================> ', result);
      knex('weights').insert({weight: weight, user_id: result[0].id, date: new Date()})
        .then(function(){
          res.send({success:true, message: 'ok'});
        });
    });
});

//curl -v -H "Authorization: Bearer 123456789" --data "food=buger&calories=1000" http://localhost:4050/food
app.post('/food', function(req, res) {
  var food = req.body.food;
  var brand = req.body.brand || null;
  var ammount = req.body.ammount || null;
  var calories = req.body.calories || null;
  console.log('somethings=======', req.user)
  knex('users').select('id').where({username: req.user})
    .catch(function(err){

      res.status(404).send();
    })
    .then(function(result) {
      knex('foods')
        .insert({food: food, brand: brand, ammount: ammount, calories: calories, user_id: result[0].id, created_at: new Date()})
        .then(function(){
          res.send({success:true, message:'ok'});
        });
    });
})

//curl -v -H "Authorization: Bearer 123456789" --data "exercise=sex&calories=1000&miles=34" http://localhost:4050/exercise
app.post('/exercise', function(req, res) {
  var exercise = req.body.exercise;
  var calories = req.body.calories;
  var miles = req.body.miles;

  knex('users').select('id').where({username: req.user})
    .then(function(id){
      knex('exercises').insert({exercise: exercise, calories: calories, miles: miles, user_id: id[0].id, created_at: new Date()}).
      then(function(){
        res.send({success: true, message: 'ok'});
      })
    })
    .catch(function(e) {
      res.status(401).send({message: 'problem inserting in database'});
    });
});


app.listen(app.get('port'), function() {
  console.log('Balance running on port ... ', app.get('port'));
});
