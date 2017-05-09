module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'balance',
      user:     'root',
      password: ''
    },
    seeds: {
      directory: './db/migrations/seeds'
    }
  }
};
