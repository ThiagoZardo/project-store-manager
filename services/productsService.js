const productsModel = require('../models/productsModel');

const getAll = async () => {
  const product = await productsModel.getAllProducts();
  return product;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return false;
  return product;
};

const createProductService = async (name) => {
  const product = await productsModel.createProductModel(name);
  if (!product) return false;
  return product;
};

module.exports = {
  getAll,
  findById,
  createProductService,
};
