var knex = require('knex')({


client: 'mysql',
 connection: {
   host : '127.0.0.1',
   user : 'root',
   password : '',
   database : 'balance'
 }
});


knex.schema.createTableIfNotExists('users', function (col) {
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
  col.timestamp('created_at').notNullable();
  col.foreign('user_id').references('users.id');
})
.createTableIfNotExists('drinks', function (col) {
  col.increments('id').primary();
  col.string('drink').notNullable();
  col.integer('calories').notNullable();
  col.timestamp('created_at').notNullable();
  col.foreign('user_id').references('users.id');
})
.createTableIfNotExists('exercises', function (col) {
  col.increments('id').primary();
  col.string('exercise').notNullable();
  col.float('miles', 4, 1).notNullable();
  col.timestamp('created_at').notNullable();
  col.foreign('user_id').references('users.id');
})
.then(function() {
  console.log('tables been created')
})
.catch(function(error) {
  console.log(error);
})
