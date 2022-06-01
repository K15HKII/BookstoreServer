const {PublisherController} = require("../../controllers/publishercontroller");
const router = require("express").Router();

router.get('/:id', PublisherController.one);
router.get('/', PublisherController.all);

module.exports = router;