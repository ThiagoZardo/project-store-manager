const connection = require('./connection');

const checkProductExists = async (id) => {
  // console.log('Recebe', id);
  const [verify] = await connection.execute(
    'SELECT product_id FROM StoreManager.sales_products WHERE product_id=?', [id],
  );
  // console.log('Retorna', verify);
  return verify;
};

const registerSale = async () => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return newSale;
};

const registerSaleProduct = async (saleProduct) => {
  const registerSaleModel = await registerSale();
  saleProduct.map(async (el) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [registerSaleModel.insertId, el.productId, el.quantity],
    );
  });
  const successfulSale = {
    id: registerSaleModel.insertId,
    itemsSold: [
        ...saleProduct,
    ],
  };
  return successfulSale;
};

module.exports = {
  registerSaleProduct,
  registerSale,
  checkProductExists,
};
