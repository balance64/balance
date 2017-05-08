module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-03.cleardb.net',
      database: 'heroku_55758f1ee80e743',
      user:     'b8a31a653b0b39',
      password: 'ef1f2289'
    },
    seeds: {
      directory: './migrations/seeds'
    },
    ssl:true
  }
};
