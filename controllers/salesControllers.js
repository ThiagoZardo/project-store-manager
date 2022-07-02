const salesService = require('../services/salesServices');

const registerSale = async (req, res) => {
  const sale = req.body;
  console.log('recebi do rea.body: ', sale);
  const newSale = await salesService.registerSale(sale);
  if (!newSale) return res.status(404).json({ message: 'Product not found' });
  return res.status(201).json(newSale);
};

module.exports = {
  registerSale,
};
