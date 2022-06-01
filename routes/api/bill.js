const {BillController} = require("../../controllers/billcontroller");
const router = require('express').Router();

router.get('/:userId', BillController.getByUser);

module.exports = router;