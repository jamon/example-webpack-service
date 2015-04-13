var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

app.get('/test', function (req, res) {
  res.json({message: "this is a test"});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
