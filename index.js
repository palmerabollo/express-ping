exports.health = function(req, res, next) {
  console.log(req.path);
  console.log(req.originalUrl);

  if (req.path === '/ping') {
    res.send({'todo': true}, 200);
    res.end();
  } else {
    next();
  }
}
