const salesModels = require('../models/salesModels');

const checkProductExists = async (sale) => {
  const productExist = await Promise.all(sale
    .map((el) => salesModels.checkProductExists(el.productId)));
  const exist = productExist.some((el) => el.length === 0);
  return exist;
};

const registerSale = async (sale) => {
  const productExist = await checkProductExists(sale);
  if (productExist) return false;
  const newSale = await salesModels.registerSaleProduct(sale);
  if (!newSale) return false;
  return newSale;
};

const serialize = async (sales) => {
  const saleCamelCase = sales.map((el) => ({
    saleId: el.sale_id,
    date: el.date,
    productId: el.product_id,
    quantity: el.quantity,
  }));
  return saleCamelCase;
};

const listAllSales = async () => {
  const sales = await salesModels.listAllSales();
  const objSale = await serialize(sales);
  return objSale;
};

const findBySale = async (id) => {
  const sale = await salesModels.findBySale(id);
  if (sale.length === 0) return false;
  const saleCamelCase = sale.map((el) => ({
    date: el.date,
    productId: el.product_id,
    quantity: el.quantity,
  }));
  return saleCamelCase;
};

const deleteSale = async (id) => {
  const saleDelected = await salesModels.deleteSale(id);
  if (saleDelected <= 0) return false;
  return true;
};

module.exports = {
  registerSale,
  checkProductExists,
  listAllSales,
  findBySale,
  serialize,
  deleteSale,
};
