var os = require('os'),
    path = require('path');

var appRootDir = path.dirname(require.main.filename);
var pjson = require(appRootDir + path.sep +'package.json');

var DEFAULT_PATH = '/ping';

module.exports.ping = function pingMiddlewareWrapper(path) {
  path = path || DEFAULT_PATH;
  return function pingMiddleware(req, res, next) {
    if (req.path === path) {
      res.json({
        timestamp: Date.now(),
        uptime: process.uptime(),
        pid: process.pid,
        memory: process.memoryUsage(),
        versions: process.versions,
        title: process.title,
        arch: process.arch,
        platform: process.platform,
        argv: process.argv,
        application: {
          name: pjson.name,
          version: pjson.version
        },
        os: {
          hostname: os.hostname(),
          uptime: os.uptime(),
          loadavg: os.loadavg(),
          cpus: os.cpus(),
          nics: os.networkInterfaces()
        }
      });
    } else {
      next();
    }
  };
};
