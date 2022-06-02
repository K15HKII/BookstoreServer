const {User} = require("../../models/user");
const router = require('express').Router();
const UserController = require('../../controllers/user.controller').UserController;

router.get('/profile/:user_id?', UserController.getProfile);
router.post('/profile/:user_id?', UserController.updateProfile);

router.get('/setting/:user_id?'); //TODO: get user setting
router.post('/setting/:user_id?'); //TODO: update user setting

router.get('/recent/:user_id?'); //TODO: get recent books
router.post('/recent/:user_id?'); //TODO: add recent book

router.get('/favourites/:user_id?', UserController.favouriteBooks);
router.post('/favourite/:user_id?', UserController.addFavouriteBook); //TODO: add book to favourites
router.delete('/favourite/:user_id?', UserController.removeFavouriteBook); //TODO: remove book from favourites

router.get('/carts/:user_id?', UserController.cartItems);
router.post('/cart/:user_id?', UserController.addCartItem); //TODO: add book to cart
router.delete('/cart/:user_id?', UserController.removeCartItem); //TODO: remove book from cart
router.put('/cart/:book_id/:user_id?', UserController.updateCartItem); //TODO: update cart

router.get('/bills/:user_id?'); //TODO: get user's bills
router.post('/bill/:user_id?'); //TODO: create bill from carts
router.delete('/bill/:bill_id/:user_id?'); //TODO: cancel bill

router.get('/addresses/:user_id?'); //TODO: get addresses
router.post('/address/:user_id?'); //TODO: add address
router.delete('/address/:user_id?'); //TODO: remove address

router.get('/banks/:user_id?'); //TODO: get banks
router.post('/bank/:user_id?'); //TODO: add bank
router.delete('/bank/:user_id?'); //TODO: remove bank

router.get('/lends/:user_id?'); //TODO: get lends
router.post('/lend/:user_id?'); //TODO: lend book
router.delete('/lend/:user_id?'); //TODO: return book

router.get('/vouchers/:user_id?'); //TODO: get vouchers

//region Management
router.post('/moderator/:user_id?'); //TODO: create or update modeartor
//endregion

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Search users
 *     query:
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserSearch'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/', UserController.search);

module.exports = router;


