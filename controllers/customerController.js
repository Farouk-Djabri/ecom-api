const Product = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { add, deleteFCart } = require('../services/cartService');

// Add product to cart
const addToCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const cart = await add(productId, userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete from cart
const deleteFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  try {
    const cart = await deleteFCart(productId, userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Place order
const placeOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) throw new Error('Cart not found');

    const products = cart.products.map((p) => ({
      product: p.product,
      quantity: p.quantity,
      price: p.product.price,
    }));

    const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const order = new Order({
      user: userId,
      products: products,
      total: total,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
    });

    await order.save();
    await cart.remove();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, placeOrder, deleteFromCart };