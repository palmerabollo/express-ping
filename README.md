express-middleware-health
=========================

Let your express applications expose a simple API to inform about its internal status to operators and to other applications.

This project is created as an express middleware to simplify its usage. It is a **work in progress**. Do not use it yet. Contributions are welcome.

Usage
-----

- Add "express-middleware-health" to your package.json dependencies (npm install express-middleware-health --save)
- Include the middleware

```javascript
var health = require('express-middleware-health');
var express = require('express');

var app = express();
...
app.use(health.ping)
app.use(app.router);
...

app.listen(3000);
```

License
-------

MIT
