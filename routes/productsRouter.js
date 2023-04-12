const express = require('express');
const router = express.Router();
const { authorizeSeller, authenticate, authorizeCustomer } = require('../middlewares/check-auth');

const {
  create,
  getAll,
  getSingle,
  update,
  deleteP,
  decreaseQuantity
} = require('../controllers/productsController');

const { addToCart, deleteFromCart, placeOrder } = require('../controllers/cartController');


router.route('/').get(getAll);
router.route('/').post(authenticate, authorizeSeller, create);
router.route('/:id').get(authenticate, authorizeSeller, getSingle);
router.route('/:id').patch(authenticate, authorizeSeller, update);
router.route('/:id').put(authenticate, authorizeSeller, decreaseQuantity);
router.route('/:id').delete(authenticate, authorizeSeller, deleteP);

router.route('/cart/:id').post(authenticate, authorizeCustomer, addToCart);
router.route('/cart/:id').delete(authenticate, authorizeCustomer, deleteFromCart);


module.exports = router;
