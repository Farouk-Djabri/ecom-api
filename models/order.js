const mongoose = require('mongoose');
const User = require('./users');
const Product = require('./products');

const orderSchema = new mongoose.Schema({
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
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'shipped', 'delivered'],
    default: 'placed',
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paypal', 'cash'],
    default: 'card',
  },
});

module.exports = mongoose.model('Order', orderSchema);
