const mongoose = require('mongoose');
const User = require('./users');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: { 
    type: Number,
    required: true
  },  
  description: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
