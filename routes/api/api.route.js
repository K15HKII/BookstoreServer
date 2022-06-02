const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/user', require('./user.route'));
router.use('/book', require('./book.route'));
router.use('/bill', require('./bill.route'));
router.use('/author', require('./author.route'));
router.use('/publisher', require('./publisher.route'));
router.use('/transporter', require('./transporter.route'));
router.use('/storage', require('./storage.route'));
router.use('/message', require('./message.route'));

module.exports = router;
