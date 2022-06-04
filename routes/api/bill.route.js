const {BillController} = require("../../controllers/bill.controller");
const router = require('express').Router();

router.get('/from/:user_id', BillController.getByUser);
router.post('/:bill_id', BillController.updateBillStatus);

module.exports = router;
