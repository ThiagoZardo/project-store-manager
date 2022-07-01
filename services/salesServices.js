const saleModel = require('../models/salesModels');

const checkProductExists = async (sale) => {
  const productExist = await Promise.all(sale
    .map((el) => saleModel.checkProductExists(el.productId)));
    if (productExist.length === 0) return false;
  const exist = productExist.some((el) => el.length === 0);
  return exist;
};

const registerSale = async (sale) => {
  const productExist = await checkProductExists(sale);
  if (productExist) return false;
  const registerSaleModel = await saleModel.registerSale();
  const newSale = await Promise.all(sale
    .map((el) => saleModel.registerSaleProduct(el, registerSaleModel)));
  if (!newSale) return false;
  return newSale;
};

module.exports = {
  registerSale,
};
