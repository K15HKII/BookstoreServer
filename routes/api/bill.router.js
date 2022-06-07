const {BillController} = require("../../controllers/bill.controller");
const router = require('express').Router();

router.get('/from/:user_id', BillController.getByUser);
router.get('/:bill_id', BillController.getBill);
router.post('/:bill_id', BillController.updateBillStatus);

module.exports = router;
