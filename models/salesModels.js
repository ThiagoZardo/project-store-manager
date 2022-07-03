const connection = require('./connection');

const checkProductExists = async (id) => {
  const [verify] = await connection.execute(
    'SELECT product_id FROM StoreManager.sales_products WHERE product_id=?', [id],
  );
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

const listAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT P.sale_id, S.date, P.product_id, P.quantity
  FROM StoreManager.sales_products AS P
  INNER JOIN StoreManager.sales AS S ON P.sale_id = S.id
  ORDER BY S.id, P.product_id;
  `);
  return sales;
};

const findBySale = async (id) => {
  const [sales] = await connection.execute(
    `SELECT S.date, P.product_id, P.quantity
    FROM StoreManager.sales_products AS P
    INNER JOIN StoreManager.sales AS S ON P.sale_id = S.id
    WHERE S.id=?
    ORDER BY S.id, P.product_id`, [id],
  );
  return sales;
};

module.exports = {
  registerSaleProduct,
  registerSale,
  checkProductExists,
  listAllSales,
  findBySale,
};
