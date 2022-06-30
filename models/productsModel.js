const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return product;
};

const createProductModel = async (name) => {
  const [product] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  
  const newProduct = {
    id: product.insertId,
    name,
  };

  return newProduct;
};

module.exports = {
  getAllProducts,
  findById,
  createProductModel,
};
