const {TransporterController} = require("../../controllers/transporter.controller");
const router = require("express").Router();

router.get('/:id', TransporterController.one);
router.get('/', TransporterController.all);
router.post('/', TransporterController.create);
router.put('/:id', TransporterController.update);
router.delete('/:id', TransporterController.delete);

module.exports = router;