const connection = require('./connection');

const checkProductExists = async (id) => {
  const [verify] = await connection.execute(
    'SELECT product_id FROM StoreManager.sales_products WHERE product_id=?', [id],
  );
  return verify;
};

const registerSaleProduct = async (saleProduct, registerSale) => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [registerSale.insertId, saleProduct.productId, saleProduct.quantity],
  );
  const successfulSale = {
    id: newSale.insertId,
    itemsSold: [
      {
        productId: saleProduct.productId,
        quantity: saleProduct.quantity,
      },
    ],
  };
  console.log(successfulSale);
  return successfulSale;
};

const registerSale = async () => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return newSale;
};

module.exports = {
  registerSaleProduct,
  registerSale,
  checkProductExists,
};
