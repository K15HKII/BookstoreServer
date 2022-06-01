const {User} = require("../../models/user");
const router = require('express').Router();
const UserController = require('../../controllers/usercontroller').UserController;

router.get('/self', UserController.self);
router.get('/favourites/:id?', UserController.favouriteBooks);
router.get('/carts/:id?', UserController.cartItems);
router.get('/', UserController.search);

module.exports = router;


