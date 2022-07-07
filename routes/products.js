const express = require('express');
const productsController = require('../controllers/productsController');
const productValidator = require('../middlewares/productsMiddleware');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/search', productsController.searchProduct);
router.get('/:id', productsController.findById);

router.post('/',
  productValidator.nameValidator,
  productValidator.nameValidatorLength,
  productsController.createProduct);

router.put('/:id', productsController.productUpdate);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;