const validProductSold = (req, res, next) => {
  const sale = req.body;
  const productIdExist = sale.find((el) => el.productId);
  if (!productIdExist) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validQuantitySold = (req, res, next) => {
  const sale = req.body;
  const quantityExist = sale.find((el) => el.quantity);
  const quantityInvalid = sale.some((el) => el.quantity <= 0);
  if (quantityInvalid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!quantityExist) return res.status(400).json({ message: '"quantity" is required' });
  next();
};

const validProductID = (req, res, next) => {
  const sale = req.body;
  const productId = sale.some((el) => el.productId);
  const quantity = sale.some((el) => el.quantity);
  const quantityNull = sale.some((el) => el.quantity <= 0);
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (quantityNull) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (quantity === false) return res.status(400).json({ message: '"quantity" is required' });
  next();
};

module.exports = {
  validProductSold,
  validQuantitySold,
  validProductID,
};
