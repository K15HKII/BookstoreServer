const router = require("express").Router();

router.post('/feedback/:book_id'); //TODO: add feedback
router.post('/message/:feedback'); //TODO: add message

module.exports = router;