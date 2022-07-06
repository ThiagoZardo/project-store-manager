const salesModels = require('../models/salesModels');

const checkProductExists = async (sale) => {
  const productExist = await Promise.all(sale
    .map((el) => salesModels.checkProductExists(el.productId)));
  // console.log(productExist);
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

const saleUpdate = async (sale, id) => {
  const productExist = await checkProductExists(sale);
  if (productExist) {
    return {
      code: 404,
      message: { message: 'Product not found' },
    };
  }
  const newSale = await salesModels.saleUpdate(sale, id);
  if (newSale === false) {
    return {
      code: 404,
      message: { message: 'Sale not found' },
    };
  }
  return {
    code: 200,
    message: newSale,
  };
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
  saleUpdate,
  deleteSale,
};
