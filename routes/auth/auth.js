const express = require('express');
const router = express.Router();

const passport = require('passport');
const { verifyToken, verifyUserLocal } = require('./auth.middleware');
const strategy = require('./auth.strategy');

const { User } = require('../../models/modelmap');
const jwtVariable = require('../../variables/jwt');
const authMethods = require('./auth.methods');
const randToken = require('rand-token');

passport.use('local', strategy.Local);
passport.use('jwt', strategy.Jwt);

router.post('/login/password', verifyUserLocal, async (req, res) => {
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

    let refreshToken; // tạo 1 refresh token ngẫu nhiên
    if (!user.refresh_token) {
        refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
        user.refresh_token = refreshToken;
        await user.save();
    } else {
        refreshToken = user.refresh_token;
    }

    return res.json({
        authenticated: true,
        accessToken,
        refreshToken,
        user,
    });
});

router.get('/login/test', verifyToken, (req, res) => {
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
    User.createNew(req.body.username, req.body.password, (err, user) => {
        if (err) {
            return next(err);
        }
        res.status(201).end();
    })
});

module.exports = router;