const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  tlf:{
    type: Number,
    required: false
  }, 
  role: {
    type: String,
    required: false,
    enum: ['customer', 'seller'],
    default: 'customer'
  }
});




const User = mongoose.model('User', userSchema);

module.exports = User;