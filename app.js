const express = require('express');
const productsController = require('./controllers/productsController');
const salesControler = require('./controllers/salesControllers');
const productValidator = require('./middlewares/productsMiddleware');
const salesValidator = require('./middlewares/salesMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.listProducts);
app.get('/products/:id', productsController.findById);

app.post('/products',
  productValidator.nameValidator,
  productValidator.nameValidatorLength,
  productsController.createProduct);

app.post('/sales',
  salesValidator.validProductSold,
  salesValidator.validQuantitySold,
  salesControler.registerSale);

app.get('/sales', salesControler.listAllSales);
app.get('/sales/:id', salesControler.findBySale);

app.put('/products/:id', productsController.productUpdate);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;