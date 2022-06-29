const productsModel = require('../models/productsModel');

const getAll = async () => {
  const product = await productsModel.getAllProducts();
  return product;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return false;
  console.log(product);
  return product;
};

module.exports = {
  getAll,
  findById,
};
