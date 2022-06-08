const {StatisticController} = require("../../controllers/statistic.controller");
const {VoucherController} = require("../../controllers/voucher.controller");
const router = require('express').Router();

router.get('/profile/:profile_id', VoucherController.getProfile)
router.get('/profile', VoucherController.getProfiles);

router.get('/voucher/:voucher_id', VoucherController.getVoucher);

module.exports = router;
