const {TransporterController} = require("../../controllers/transportercontroller");
const router = require("express").Router();

router.get('/:id', TransporterController.one);
router.get('/', TransporterController.all);

module.exports = router;