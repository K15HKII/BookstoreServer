const express = require('express');
const router = express.Router();

router.use('/model/user', require('./user'));
router.use('/model/book', require('./book'));

// router.use('/models', require('./models'));
module.exports = router;
