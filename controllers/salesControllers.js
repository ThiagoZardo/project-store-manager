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

const saleUpdate = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const newSale = await salesService.saleUpdate(sale, id);
  return res.status(newSale.code).json(newSale.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleDelected = await salesService.deleteSale(id);
  if (!saleDelected) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).json();
};

module.exports = {
  registerSale,
  listAllSales,
  findBySale,
  saleUpdate,
  deleteSale,
};
