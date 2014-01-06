module.exports.ping = function(req, res, next) {
  if (req.path === '/ping') {
    res.send({'todo': true}, 200);
    res.end();
  } else {
    next();
  }
}
