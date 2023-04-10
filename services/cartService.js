const Product = require('../models/products');
const Cart = require('../models/cart');


// Add product to cart
const add = async (productId, userId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity++;
    } else {
      cart.products.push({ product: productId, name: product.name, quantity: 1 });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

  //Delete from cart
  const deleteFCart = async (productId, userId) => {
    try {
      // Find the user's cart in the database
      const cart = await Cart.findOne({ user: userId }).populate('products.product');
  
      if (!cart) {
        // Throw an error if the cart is not found
        throw new Error('Cart not found');
      }
  
      // Find the index of the product in the cart
      const itemIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
  
      if (itemIndex === -1) {
        // Throw an error if the product is not in the cart
        throw new Error('Product not found in cart');
      }
  
      // Remove the product from the cart
      cart.products.splice(itemIndex, 1);
  
      // Recalculate the cart total
      cart.total = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
      // Save the updated cart to the database
      await cart.save();
  
      return cart;
    } catch (error) {
      // Throw an error if any errors occurred during the database operation
      throw new Error('Failed to delete product from cart');
    }
  };
  


module.exports = { add, deleteFCart };
  