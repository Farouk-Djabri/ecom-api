const Product = require('../models/products');

// Create a product
const createProduct = async (createdProductInput) => {
    const { name, ...data } = createdProductInput;
  
    const product = new Product({ name, ...data });

    return await product.save()
};

//Get product
const getProduct = async (id) => {
    try {
      const product = await Product.findById(id);
      
      if (!product) {
        throw new Error('Product not found');
      }
      

      return product;
    } catch (err) {
      throw new Error(err.message);
    }
  };

//Get products
const getProducts = async () => {
  try {
    const product = await Product.find();
    
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

//Update products
const updateProduct = async (id, updateProductInput) => {
  const product = await getProduct(id);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  }
  if (product.seller && product.seller.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to update this product' });
  }
  
  await Product.updateOne({ _id:id }, updateProductInput);

  return  await getProduct(id);
};

//Delete product
const deleteProduct = async (id) => {
  const product = await getProduct(id);
  if (!product) {
    res.status(400).json({ message: 'product not found' });
  }
  if (product.seller && product.seller.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to update this product' });
  }
  await Product.deleteOne({ _id:id });
}

//Decrease Product Quantity
const decreaseProductQuantity = async (id, quantity) => {
  try {
    if (product.seller && product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this product' });
    }
    const updatedQuantity = await Product.updateOne({ _id:id}, {$set: {quantity} });
  } catch (err) {
    throw new Error(`Could not update product quantity: ${error.message}`);
  }
}






module.exports = {createProduct, getProduct, getProducts, updateProduct, deleteProduct, decreaseProductQuantity};