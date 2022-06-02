const {BillController} = require("../../controllers/bill.controller");
const router = require('express').Router();

router.get('/from/:user_id', BillController.getByUser);
router.put('/:bill_id'); //TODO: update bill

module.exports = router;