var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'ba515a4149e83a',
  password: 'f9a72a4f',
  database: 'heroku_ec7185f66b0bf5c'
});

connection.connect(function(err) {
  if (err) console.log('why you no connect?');
  console.log('You are now connected...')
});

module.exports = connection;