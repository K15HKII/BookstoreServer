const {PublisherController} = require("../../controllers/publisher.controller");
const router = require("express").Router();

router.get('/:id', PublisherController.one);
router.get('/', PublisherController.all);
router.post('/', PublisherController.create);
router.put('/:id', PublisherController.update);
router.delete('/:id', PublisherController.delete);

module.exports = router;