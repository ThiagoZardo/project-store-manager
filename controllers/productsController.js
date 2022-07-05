const { json } = require('express/lib/response');
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
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const newProduct = await productService.productUpdate(Number(id), name);
  if (!newProduct) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(newProduct);
};

module.exports = {
  listProducts,
  findById,
  createProduct,
  productUpdate,
};
