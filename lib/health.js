var pjson = require(process.cwd() + '/package.json');

module.exports.ping = function(req, res, next) {
  if (req.path === '/ping') {
    res.send({
        timestamp: Date.now(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        versions: process.versions,
        title: process.title,
        arch: process.arch,
        platform: process.platform,
        argv: process.argv,
        application: {
            name: pjson.name,
            version: pjson.version
        }
    }, 200);
    res.end();
  } else {
    next();
  }
}