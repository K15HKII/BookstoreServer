const LocalStrategy = require('passport-local');
const {passwordVerify} = require('./auth.methods');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtVariable = require('../../variables/jwt');

const routeVariable = require('../../variables/routes');

const { UserRepository, AuthProperties, IdentifyProperties } = require('../../repositories/user');

const usernameField = 'username';
const passwordField = 'password';

const findUser = async (username) => {
  const properties = [].concat(IdentifyProperties, AuthProperties);
  const users = await UserRepository.searchByUser(username, properties);
  return users && users.length > 0 ? users[0] : null;
};

exports.Local = new LocalStrategy({
  usernameField: usernameField,
  passwordField: passwordField,
}, async function verify(username, password, cb) {
  const user = await findUser(username);
  console.log(user);
  if (!user) {
    return cb(null, false, {message: 'Incorrect username or password.'});
  }
  await passwordVerify(password, user.salt, user.password, function(err, result) {
    if (err) {
      return cb(err);
    }
    if (result) {
      return cb(null, user);
    }
    return cb(null, false);
  });
});

exports.Jwt = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader(routeVariable.ACCESS_TOKEN_FIELD),
  secretOrKey: JwtVariable.accessTokenSecret
},  function verify(jwt_payload, done) {
  const user = jwt_payload.payload.user;
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
})
