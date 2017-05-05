var users = require('../testdata/userdata');
var drinks = require('../testdata/drinks');
var foods = require('../testdata/food');
var exercises = require('../testdata/exercise');

exports.seed = function(knex, Promise) {
  return (
    knex('foods').del()
      .then(() => knex('drinks').del())
      .then(() => knex('exercises').del())
      .then(() => knex('users').del())

      .then(() => knex('users').insert(users))
      .then(() => knex('drinks').insert(drinks))
      .then(() => knex('foods').insert(foods))
      .then(() => knex('exercises').insert(exercises))
  );
};
