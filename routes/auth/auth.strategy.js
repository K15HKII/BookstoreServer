const LocalStrategy = require('passport-local');
const {User} = require('../../models/modelmap');
const {passwordVerify} = require('./auth.methods');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtVariable = require('../../variables/jwt');

const usernameField = 'username';
const passwordField = 'password';

const findUser = async (username) => {
  return await User.findByUsername(username, ['id', 'salt', 'refresh_token', 'username', 'password', 'role']);
};

exports.Local = new LocalStrategy({
  usernameField: usernameField,
  passwordField: passwordField,
}, async function verify(username, password, cb) {
  const user = await findUser(username);
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
  jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
  secretOrKey: JwtVariable.accessTokenSecret
},  function verify(jwt_payload, done) {
  const user = jwt_payload.payload.user;
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
})
