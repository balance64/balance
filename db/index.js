var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'ef1f2289@us-cdbr-iron-east-03.cleardb.net',
  user: 'b8a31a653b0b39',
  password: 'ef1f2289',
  database: 'heroku_55758f1ee80e743'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});

module.exports = connection;