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
      directory: './migrations/seeds'
    }
  }
};
