const jwtVariable = require('../../variables/jwt');
const authMethods = require('./auth.methods');
const randToken = require('rand-token');
const passport = require('passport');

const verify = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, {session: false}, function(err, user, info, status) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({
          authenticated: false,
        });
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
