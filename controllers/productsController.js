const Product = require('../models/products');

const { createProduct, getProduct, getProducts, updateProduct, deleteProduct, decreaseProductQuantity } = require('../services/productService');

// Create a product
const create = async (req, res) => {
   try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
   }catch(err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single product
const getSingle = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get all products
const getAll = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
    return products;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product
const update = async (req, res) => {
    try {
      const updatedProduct = await updateProduct(req.params.id, req.body);
      res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};


// Delete a product
const deleteP = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const decreaseQuantity = async (req, res) => {
  try {
    await decreaseProductQuantity(req.params.id, req.body.quantity);
    res.status(200).json({ message: 'Product quantity updated successfully!' });
  } catch (error) {
    res.status(500).send('Error updating product quantity');
  }
};





module.exports = {
    create,
    getAll,
    getSingle,
    update,
    deleteP,
    decreaseQuantity
}