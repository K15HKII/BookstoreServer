const {StatisticController} = require("../../controllers/statistic.controller");
const router = require('express').Router();

router.get('/user/new'); //TODO
router.get('/user/top', StatisticController.getTopCustomers); //TODO

router.get('/order/new'); //TODO
router.get('/order/top'); //TODO

router.get('/book/new'); //TODO
router.get('/book/top'); //TODO
router.get('/book/sold'); //TODO

router.get('/outcome/book/:book_id?'); //TODO
router.get('/outcome/user/:user_id'); //TODO
router.get('/outcome'); //TODO

router.get('/income/book/:book_id?'); //TODO
router.get('/income/user/:user_id'); //TODO
router.get('/income'); //TODO

module.exports = router;
