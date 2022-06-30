const productService = require('../services/productsService');

const listProducts = async (req, res) => {
  const product = await productService.getAll();
  return res.status(200).json(product);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProductService(name);
  return res.status(201).json(newProduct);
}

module.exports = {
  listProducts,
  findById,
  createProduct,
};
