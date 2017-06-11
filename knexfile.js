module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'balance',
      user:     'root',
      password: ''
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/migrations/seeds'
    }
  }
};
