var os = require('os');
var pjson = require(process.cwd() + '/package.json');

module.exports.ping = function(req, res, next) {
  if (req.path === '/ping') {
    res.send({
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
            uptime: os.uptime()
        }
    }, 200);
    res.end();
  } else {
    next();
  }
}