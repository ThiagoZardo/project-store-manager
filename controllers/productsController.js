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

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productDeleted = await productService.deleteProduct(id);
  if (!productDeleted) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).json();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const searchProductService = await productService.searchProduct(q);
  return res.status(200).json(searchProductService);
};

module.exports = {
  listProducts,
  findById,
  createProduct,
  productUpdate,
  deleteProduct,
  searchProduct,
};
