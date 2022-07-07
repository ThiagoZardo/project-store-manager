const express = require('express');
const salesControler = require('../controllers/salesControllers');
const salesValidator = require('../middlewares/salesMiddlewares');

const router = express.Router();

router.post('/',
  salesValidator.validProductSold,
  salesValidator.validQuantitySold,
  salesControler.registerSale);

router.get('/', salesControler.listAllSales);
router.get('/:id', salesControler.findBySale);

router.put('/:id',
  salesValidator.validProductID,
  salesControler.saleUpdate);

router.delete('/:id', salesControler.deleteSale);

module.exports = router;