var health = require('../index');
var express = require('express');

var app = express();
app.use(health.ping({accessToken: '1234', path: '/health'}));
app.use(app.router);

app.listen(3000);
console.log('Ready. http://localhost:3000/health?access_token=1234 to check health');