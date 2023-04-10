const mongoose = require('mongoose');
const User = require('./users');
const Product = require('./users');


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
