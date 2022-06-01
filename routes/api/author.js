const {AuthorController} = require("../../controllers/authorcontroller");
const router = require("express").Router();

router.get('/:id', AuthorController.one);
router.get('/', AuthorController.all);

module.exports = router;