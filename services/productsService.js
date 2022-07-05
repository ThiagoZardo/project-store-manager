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

const productUpdate = async (id, name) => {
  const productJSON = { id: Number(id), name };
  const productNewUpdate = {
    id: productJSON.id,
    name: productJSON.name,
  };
  const newProduct = await productsModel.productUpdate(productJSON);
  if (!newProduct) return false;
  if (newProduct > 0) return productNewUpdate;
};

module.exports = {
  getAll,
  findById,
  createProductService,
  productUpdate,
};
