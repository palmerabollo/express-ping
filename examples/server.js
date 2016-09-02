var health = require('../index');
var express = require('express');

var app = express();
app.use(health.ping())
app.use(app.router);

health.info(function(err, data){
  console.log('Info: ', data);
});

app.listen(3000);
console.log('Ready. http://localhost:3000/ping to check health');
