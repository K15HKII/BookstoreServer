const {LendController} = require("../../controllers/lend.controller");
const router = require('express').Router();

router.get('/from/:user_id', LendController.getByUser);
router.get('/:lend_id', LendController.getLend);
router.post('/:lend_id'); //TODO:

module.exports = router;
