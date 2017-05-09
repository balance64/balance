var users = require('../testdata/userdata');
var weights = require('../testdata/weights');
var foods = require('../testdata/food');
var exercises = require('../testdata/exercise');

exports.seed = function(knex, Promise) {
  return (
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
  );
};
