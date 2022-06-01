const {User} = require("../../models/user");
const router = require('express').Router();
const UserController = require('../../controllers/usercontroller').UserController;

router.get('/', UserController.search);

module.exports = router;


