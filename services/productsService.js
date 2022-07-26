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
  const newProduct = await productsModel.productUpdate(productJSON);
  const productNewUpdate = {
    id: productJSON.id,
    name: productJSON.name,
  };
  if (newProduct <= 0) return false;
  return productNewUpdate;
};

const deleteProduct = async (id) => {
  const productDeleted = await productsModel.deleteProduct(id);
  if (productDeleted <= 0) return false;
  return true;
};

const searchProduct = async (q) => {
  const searchProductModel = await productsModel.searchProduct(q);
  return searchProductModel;
};

module.exports = {
  getAll,
  findById,
  createProductService,
  productUpdate,
  deleteProduct,
  searchProduct,
};
