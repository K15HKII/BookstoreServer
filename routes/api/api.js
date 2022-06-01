const express = require('express');
const {verifyToken} = require("../auth/auth.middleware");
const router = express.Router();

router.use(verifyToken);
router.use('/model/user', require('./user'));
router.use('/model/book', require('./book'));
router.use('/model/bill', require('./bill'));
router.use('/model/author', require('./author'));
router.use('/model/publisher', require('./publisher'));
router.use('/model/transporter', require('./transporter'));

module.exports = router;
