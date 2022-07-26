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

const saleUpdate = async (sale, id) => {
  const [newSale] = await Promise.all(sale.map(async (el) => connection.execute(
    `UPDATE sales_products 
        SET quantity=?
        WHERE sale_id=? AND product_id=?`,
    [el.quantity, id, el.productId],
  )));
  if (newSale[0].affectedRows === 0) return false;
  const successfulSale = {
    saleId: id,
    itemsUpdated: [
      ...sale,
    ],
  };
  return successfulSale;
};

const deleteSale = async (id) => {
  const [saleDelected] = await connection.execute(
    `DELETE
      FROM sales
        WHERE id=?`, [id],
  );
  return saleDelected.affectedRows;
};

module.exports = {
  registerSaleProduct,
  registerSale,
  checkProductExists,
  listAllSales,
  findBySale,
  saleUpdate,
  deleteSale,
};
