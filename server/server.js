var express = require('express');
var app = express();

app.use(express.static('../client'));

app.get('/theTruth', (req, res) => res.send('life sucks'));

app.listen(4568, function() {
  console.log('listening on 4568...');
})