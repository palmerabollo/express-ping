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

module.exports.ping = function pingMiddlewareWrapper(path) {
  path = path || DEFAULT_PATH;
  return function pingMiddleware(req, res, next) {
    if (req.path === path) {

      df(function (error, diskInfo) {
        if (error) {
          diskInfo = {msg: 'Error fetching disk info', error: error};
        }
        res.json({
          timestamp: Date.now(),
          uptime: process.uptime(),

          application: {
            name: pjson.name,
            version: pjson.version,
            pid: process.pid,
            title: process.title,
            argv: process.argv,
            versions: process.versions,
            node_env: process.env.NODE_ENV
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
        });
      });

    } else {
      next();
    }
  };
};
