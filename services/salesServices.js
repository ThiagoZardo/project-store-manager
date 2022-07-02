const salesModels = require('../models/salesModels');

const checkProductExists = async (sale) => {
  const productExist = await Promise.all(sale
    .map((el) => salesModels.checkProductExists(el.productId)));
  if (productExist.length === 0) return false;
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

module.exports = {
  registerSale,
  checkProductExists,
};
