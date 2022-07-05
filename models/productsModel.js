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

const productUpdate = async (productJSON) => {
  const [newProduct] = await connection.execute(
    `UPDATE products
      SET name=?
      WHERE id=?`,
      [productJSON.name, productJSON.id],
  );
  return newProduct.affectedRows;
};

const deleteProduct = async (id) => {
  const [productDeleted] = await connection.execute(
    `DELETE
      FROM products
        WHERE id=?`, [id],
  );
  return productDeleted.affectedRows;
};

module.exports = {
  getAllProducts,
  findById,
  createProductModel,
  productUpdate,
  deleteProduct,
};
