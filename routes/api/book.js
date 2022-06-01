const {BookController} = require('../../controllers/bookcontroller');
const router = require('express').Router();

router.get('/:id', BookController.one);
router.get('/', BookController.search);

module.exports = router;


