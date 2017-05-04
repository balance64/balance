module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'balance',
      user:     'root',
      password: ''
    },
  seeds: {
    directory: './migrations/seeds'
    }
  }
};
