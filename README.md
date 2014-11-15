express-ping
============

Let your express applications **expose a simple API to inform about its internal status** and health to both operators and to other applications.

This module was created as an express middleware to simplify its usage. Add a **single line** to your express application and you are done.

Usage
-----

* Add "express-ping" to your package.json dependencies (```npm install express-ping --save```)
* Include the middleware in your express application:

```javascript
var health = require('express-ping');
var express = require('express');

var app = express();
...
app.use(health.ping()); // this is the only addition
app.use(app.router);
...

app.listen(3000);
```

Once you launch your express application, it will add a new **/ping** endpoint to check the app status. If you **GET http://localhost:3000/ping** you will receive the following information:

```json
{
  "timestamp": 1406542638314,
  "uptime": 6,
  "application": {
    "name": "express-ping-example",
    "version": "1.2.3",
    "pid": 47633,
    "title": "node",
    "argv": [
      "node",
      "/private/tmp/express-ping/examples/server.js"
    ],
    "versions": {
      "http_parser": "1.0",
      "node": "0.10.26",
      "v8": "3.14.5.9",
      "ares": "1.9.0-DEV",
      "uv": "0.10.25",
      "zlib": "1.2.3",
      "modules": "11",
      "openssl": "1.0.1e"
    }
  },
  "resources": {
    "memory": {
      "rss": 25481216,
      "heapTotal": 17603072,
      "heapUsed": 7394608
    },
    "loadavg": [
      1.1484375,
      1.46923828125,
      1.66015625
    ],
    "cpu": [
      {
        "model": "Intel(R) Core(TM) i5-2415M CPU @ 2.30GHz",
        "speed": 2300,
        "times": {
          "user": 114993850,
          "nice": 0,
          "sys": 103728020,
          "idle": 503833400,
          "irq": 0
        }
      },
      {
        "model": "Intel(R) Core(TM) i5-2415M CPU @ 2.30GHz",
        "speed": 2300,
        "times": {
          "user": 57503220,
          "nice": 0,
          "sys": 35838280,
          "idle": 624247570,
          "irq": 0
        }
      },
      {
        "model": "Intel(R) Core(TM) i5-2415M CPU @ 2.30GHz",
        "speed": 2300,
        "times": {
          "user": 102379040,
          "nice": 0,
          "sys": 82181270,
          "idle": 533028910,
          "irq": 0
        }
      },
      {
        "model": "Intel(R) Core(TM) i5-2415M CPU @ 2.30GHz",
        "speed": 2300,
        "times": {
          "user": 51145170,
          "nice": 0,
          "sys": 26503950,
          "idle": 639939820,
          "irq": 0
        }
      }
    ],
    "disk": [
      {
        "filesystem": "/dev/disk0s2",
        "size": 487546976,
        "used": 349343740,
        "available": 137947236,
        "capacity": 0.72,
        "mount": "/"
      },
      {
        "filesystem": "devfs",
        "size": 201,
        "used": 201,
        "available": 0,
        "capacity": 1,
        "mount": "/dev"
      },
      {
        "filesystem": "map -hosts",
        "size": 0,
        "used": 0,
        "available": 0,
        "capacity": 1,
        "mount": "/net"
      },
      {
        "filesystem": "map auto_home",
        "size": 0,
        "used": 0,
        "available": 0,
        "capacity": 1,
        "mount": "/home"
      }
    ],
    "nics": {
      "lo0": [
        {
          "address": "::1",
          "family": "IPv6",
          "internal": true
        },
        {
          "address": "127.0.0.1",
          "family": "IPv4",
          "internal": true
        },
        {
          "address": "fe80::1",
          "family": "IPv6",
          "internal": true
        }
      ],
      "en1": [
        {
          "address": "fe80::e6ce:8fff:fe36:c616",
          "family": "IPv6",
          "internal": false
        },
        {
          "address": "192.168.1.33",
          "family": "IPv4",
          "internal": false
        }
      ],
      "vboxnet1": [
        {
          "address": "10.10.10.1",
          "family": "IPv4",
          "internal": false
        }
      ]
    }
  },
  "system": {
    "arch": "x64",
    "platform": "darwin",
    "type": "Darwin",
    "release": "13.2.0",
    "hostname": "tizona.local",
    "uptime": 1608435,
    "cores": 4,
    "memory": 8589934592
  }
}
```

Configuration
-------------

You don't need to configure anything. By default, a `/ping` endpoint will be added to your routes, but you can pass the _ping_ endpoint to the middeware simply doing:

```js
app.use(health.ping('/custompath'));
```

To provide **authorized access**, use a middleware (i.e. [connect-basic-auth](https://github.com/c4milo/connect-basic-auth)) before express-ping. Example:

```
app.get('/ping', basicAuth('username', 'password'));
app.use(health.ping('/ping'));
```

Notes
-----

* [Debate around the JSON organization](https://github.com/palmerabollo/express-ping/wiki/Response-Format-Debate) (contributions are welcome).
* Port for koa.js [koa-ping](https://github.com/AlexeyKhristov/koa-ping)

License
-------

MIT
