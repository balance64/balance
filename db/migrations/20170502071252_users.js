
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (col) => {
    col.increments('id').primary();
    col.string('username').unique().notNullable();
    col.string('password').notNullable();
    col.integer('weight').notNullable();
    col.integer('height').notNullable();
    col.string('sex').notNullable();
  })
  .createTableIfNotExists('foods', function (col) {
    col.increments('id').primary();
    col.string('food').notNullable();
    col.integer('calories').notNullable();
    col.datetime('created_at').notNullable();
    col.integer('user_id').unsigned();
    col.foreign('user_id').references('users.id');
  })
  .createTableIfNotExists('drinks', function (col) {
    col.increments('id').primary();
    col.string('drink').notNullable();
    col.integer('calories').notNullable();
    col.datetime('created_at').notNullable();
    col.integer('user_id').unsigned();
    col.foreign('user_id').references('users.id');
  })
  .createTableIfNotExists('exercises', function (col) {
    col.increments('id').primary();
    col.string('exercise').notNullable();
    col.float('miles', 4, 1).notNullable();
    col.datetime('created_at').notNullable();
    col.integer('user_id').unsigned();
    col.foreign('user_id').references('users.id');
  })
  .then(function() {
    console.log('tables been created')
  })
  .catch(function(error) {
    console.log(error);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises')
  .dropTable('foods')
  .dropTable('drinks')
  .dropTable('users');
};
