var os = require('os'),
    df = require('node-df'),
    path = require('path');

function loadMainPackageJSON(attempts) {
  attempts = attempts || 1;
    if (attempts > 5) {
        throw new Error('Can\'t resolve main package.json file');
    }
    var mainPath = attempts === 1 ? './' : Array(attempts).join("../");
    try {
        return require.main.require(mainPath + 'package.json');
    } catch (e) {
        return loadMainPackageJSON(attempts + 1);
    }
}

var pjson = loadMainPackageJSON();
var DEFAULT_PATH = '/ping';

/**
 * Get system informaton
 * @param {Function} cb
 */
function info(cb) {
  df(function (error, diskInfo) {
    if (error) {
      diskInfo = {msg: 'Error fetching disk info', error: error};
    }

    var data = {
      timestamp: Date.now(),
      uptime: process.uptime(),

      application: {
        name: pjson.name,
        version: pjson.version,
        pid: process.pid,
        title: process.title,
        argv: process.argv,
        versions: process.versions,
        node_env: process.env.NODE_ENV,
        dependencies: pjson.dependencies
      },

      resources: {
        memory: process.memoryUsage(),
        loadavg: os.loadavg(),
        cpu: os.cpus(),
        disk: diskInfo,
        nics: os.networkInterfaces()
      },

      system: {
        arch: process.arch,
        platform: process.platform,
        type: os.type(),
        release: os.release(),
        hostname: os.hostname(),
        uptime: os.uptime(),
        cores: os.cpus().length,
        memory: os.totalmem()
      }
    };

    cb(null, data);
  });
}

/**
 * Ping health check express middleware
 * @param {String} path
 */
function pingMiddleware(path) {
  path = path || DEFAULT_PATH;
  return function pingMiddleware(req, res, next) {
    if (req.path === path) {
      info(function(err, data) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, 2));
      });
    } else {
      next();
    }
  };
};

module.exports = {
  info: info,
  ping: pingMiddleware
};
