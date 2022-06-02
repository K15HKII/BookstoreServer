const {AuthorController} = require("../../controllers/author.controller");
const router = require("express").Router();

router.get('/:id', AuthorController.one);
router.get('/', AuthorController.all);
router.post('/', AuthorController.create);
router.put('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

module.exports = router;