const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('1. Verifica retorno da função listProducts', () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').resolves([]);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('é retornado o código 200', async () => {
    await productsController.listProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('é retornado json contendo um array', async () => {
    await productsController.listProducts(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});

describe('2. Verifica retorno da função findById', () => {
  const request = {}
  const response = {};
  const returnProductService = { id: 1, name: 'Martelo de Thor' }
  request.params = { id: 1 }
  
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    
    sinon.stub(productsService, 'findById').resolves(returnProductService);
  });
  
  after(() => {
    productsService.findById.restore();
  });
  
  it('é retornado o código 200', async () => {
    await productsController.findById(request, response);
    expect(response.status.calledWith(200)).to.equal(true);
  });
});

describe('2. Verifica quando o retorno da função findById retorna false', () => {
  const request = {}
  const response = {};
  const returnProductService = false;
  request.params = { id: 1 }

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves(returnProductService);
  });

  after(() => {
    productsService.findById.restore();
  });

  it('é retornado o código 404 em caso de erro', async () => {
    await productsController.findById(request, response);
    expect(response.status.calledWith(404)).to.equal(true);
  });
});

describe('3. Verifica retorno da função createProduct', () => {
  const request = { body: { name: 'Martelo de Thor' } }
  const response = {};
  const returnProductService = { name: 'Martelo de Thor' }

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'createProductService').resolves(returnProductService);
  });

  after(() => {
    sinon.restore();
  });

  it('é retornado o código 200', async () => {
    await productsController.createProduct(request, response);
    expect(response.status.calledWith(201)).to.equal(true);
  });
});
