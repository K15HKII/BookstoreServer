const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/user', require('./user'));
router.use('/book', require('./book'));
router.use('/bill', require('./bill'));
router.use('/author', require('./author'));
router.use('/publisher', require('./publisher'));
router.use('/transporter', require('./transporter'));
router.use('/storage', require('./storage'));
router.use('/message', require('./message'));

module.exports = router;
