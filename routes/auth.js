const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { User } = require('../models/modelmap');
const { Op } = require("sequelize");

const hash = (password, salt, callback) => crypto.pbkdf2(password, salt, 310000, 32, 'sha256', callback);

const passwordVerify = (password, salt, targetPassword, callback) => {
    hash(password, salt, (err, hash) => {
        if (err) { return callback(err); }
        if (!crypto.timingSafeEqual(targetPassword, hash)) {
            return callback(null, false);
        }
        return callback(null, true);
    });
};

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use('local', new LocalStrategy(function verify(username, password, cb) {
    const user = User.findOne(username, ['id', 'username', 'email', 'password', 'salt']);
    if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    passwordVerify(password, user.salt, user.password, function(err, result) {
        if (err) { return cb(err); }
        if (result) { return cb(null, user); }
        return cb(null, false, { message: 'Incorrect username or password.' });
    });
}));

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});


const router = express.Router();

/* GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML form, into which the user enters their
 * username and password.  When the user submits the form, a request will be
 * sent to the `POST /login/password` route.
 */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post('/signup', function(req, res, next) {
    const user = User.findOne(req.body.username, ['id', 'username']);
    if (user) {
        return res.status(409).send('Username already exists');
    }

    const salt = crypto.randomBytes(16);
    const password = req.body.password;
    hash(password, salt, (err, hashedPassword) => {
        if (err) { return next(err); }

        const newUser = User.create({
            username: req.body.username,
            password: hashedPassword,
            salt: salt.toString('hex')
        });
        req.login(user, function(err) {
            if (err) { return next(err); }
            res.redirect('/'); //TODO: return accesss token and refresh token
        });
    });
});

module.exports = router;
