const router = require('express').Router();

router.get('/sold-books/:book_id?'); //TODO
router.get('/new-books/:book_id?'); //TODO
router.get('/new-user'); //TODO
router.get('/new-order'); //TODO

router.get('/outcome/book/:book_id?'); //TODO
router.get('/outcome/user/:user_id'); //TODO
router.get('/outcome'); //TODO

router.get('/income/book/:book_id?'); //TODO
router.get('/income/user/:user_id'); //TODO
router.get('/income'); //TODO

module.exports = router;
