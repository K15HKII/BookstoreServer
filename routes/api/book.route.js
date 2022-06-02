const {BookController} = require('../../controllers/book.controller');
const router = require('express').Router();

router.get('/feedback/:book_id'); //TODO: get feedback
router.get('/info/:book_id', BookController.one);
router.get('/search', BookController.search);

module.exports = router;


