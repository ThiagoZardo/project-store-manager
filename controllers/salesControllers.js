const salesService = require('../services/salesServices');

const registerSale = async (req, res) => {
  const sale = req.body;
  const newSale = await salesService.registerSale(sale);
  if (!newSale) return res.status(404).json({ message: 'Product not found' });
  return res.status(201).json(newSale);
};

const listAllSales = async (_req, res) => {
  const sales = await salesService.listAllSales();
  return res.status(200).json(sales);
};

const findBySale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findBySale(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

module.exports = {
  registerSale,
  listAllSales,
  findBySale,
};
