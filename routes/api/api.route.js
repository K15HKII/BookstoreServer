const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/user', require('./user.router'));
router.use('/book', require('./book.router'));
router.use('/bill', require('./bill.router'));
router.use('/author', require('./author.router'));
router.use('/publisher', require('./publisher.router'));
router.use('/transporter', require('./transporter.router'));
router.use('/storage', require('./storage.router'));
router.use('/message', require('./message.router'));
router.use('/statistic', require('./statistic.router'));

module.exports = router;
