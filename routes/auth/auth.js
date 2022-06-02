const express = require('express');
const router = express.Router();

const passport = require('passport');
const { verifyToken, verifyUserLocal } = require('./auth.middleware');
const strategy = require('./auth.strategy');

const jwtVariable = require('../../variables/jwt');
const authMethods = require('./auth.methods');
const randToken = require('rand-token');

const routeVariable = require('../../variables/routes');
const {UserRepository} = require("../../repositories/user.repository");

const AppDataSource = require('../../config/database').AppDataSource;
const User = require('../../models/user').User;

passport.use('local', strategy.Local);
passport.use('jwt', strategy.Jwt);

router.post('/login', verifyUserLocal, async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).send('Tên đăng nhập không tồn tại.');
    }

    const accessTokenLife = jwtVariable.accessTokenLife;
    const accessTokenSecret = jwtVariable.accessTokenSecret;

    const dataForAccessToken = {
        user: user,
    };
    const accessToken = await authMethods.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    );
    if (!accessToken) {
        return res
          .status(401)
          .send('Đăng nhập không thành công, vui lòng thử lại.');
    }

    let refreshToken;
    if (!user.refresh_token) {
        refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
        user.refresh_token = refreshToken;
        await UserRepository.save(user);
    } else {
        refreshToken = user.refresh_token;
    }

    let json = {};
    json[routeVariable.ACCESS_TOKEN_FIELD] = accessToken;
    json[routeVariable.REFRESH_TOKEN_FIELD] = refreshToken;
    json[routeVariable.AUTHENTICATED_FIELD] = true;
    json['user_id'] = user.id;

    return res.json(json);
});

router.get('/verify', verifyToken, (req, res) => {
    res.json({
        msg: 'done',
        user: req.user
    });
});

router.post('/signup', async (req, res, next) => {
    const user = await User.findByUsername(req.body.username, ['id', 'username']);
    if (user) {
        return res.status(409).send('Username already exists');
    }
    await User.createNew(req.body.username, req.body.password, (err, user) => {
        if (err) {
            return next(err);
        }
        res.status(201).end();
    })
});

module.exports = router;
