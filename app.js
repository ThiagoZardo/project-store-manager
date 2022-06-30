const express = require('express');
const productsController = require('./controllers/productsController');
const nameValidator = require('./middlewares/productsMiddleware');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.listProducts);
app.get('/products/:id', productsController.findById);

app.post('/products',
  nameValidator.nameValidator,
  nameValidator.nameValidatorLength,
  productsController.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;