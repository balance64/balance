var users = require('../testdata/userdata');
<<<<<<< 744138379141d6decefa7a9bf3c19776cb60ceaa
// var drinks = require('../testdata/drinks');
var weights = require('../testdata/weights');
=======
var drinks = require('../testdata/drinks');
>>>>>>> done with test data just incase you for git the function name is knex seed:run have a good night
var foods = require('../testdata/food');
var exercises = require('../testdata/exercise');

exports.seed = function(knex, Promise) {
  return (
<<<<<<< 744138379141d6decefa7a9bf3c19776cb60ceaa
      knex('foods').del()
      // .then(() => knex('drinks').del())
      
      .then(() => knex('exercises').del())
      .then(() => knex('weights').del())
      .then(() => knex('users').del())
      
      // .then(() => knex('drinks').insert(drinks))
      .then(() => knex('users').insert(users))
      .then(() => knex('foods').insert(foods))
      .then(() => knex('exercises').insert(exercises))
      .then(() => knex('weights').insert(weights))
=======
    knex('foods').del()
      .then(() => knex('drinks').del())
      .then(() => knex('exercises').del())
      .then(() => knex('users').del())

      .then(() => knex('users').insert(users))
      .then(() => knex('drinks').insert(drinks))
      .then(() => knex('foods').insert(foods))
      .then(() => knex('exercises').insert(exercises))
>>>>>>> done with test data just incase you for git the function name is knex seed:run have a good night
  );
};
