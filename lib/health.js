var os = require('os'),
    df = require('node-df'),
    path = require('path');

var appRootDir = path.dirname(require.main.filename);
var pjson = require(appRootDir + path.sep +'package.json');

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
            versions: process.versions
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
