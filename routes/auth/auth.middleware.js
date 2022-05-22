const passport = require('passport');
const routeVariable = require('../../variables/routes');

const verify = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, {session: false}, function(err, user, info, status) {
      if (err) {
        return next(err);
      }
      if (!user) {
        let json = {};
        json[routeVariable.AUTHENTICATED_FIELD] = false;
        return res.json(json);
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}

exports.verifyUserLocal = verify('local');

exports.verifyToken = verify('jwt');

exports.verifyRole = (role) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(400).end()
    }

    if (!user.role) {
      return res.status(400).end();
    }

    if (user.role !== role) {
      return res.status(403).end();
    }
    next();
  }
}
