const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('1. Verifica retorno da função listProducts Controllers', () => {
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

describe('2. Verifica retorno da função findById Controllers', () => {
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

describe('3. Verifica quando o retorno da função findById retorna false Controllers', () => {
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

describe('4. Verifica retorno da função createProduct Controllers', () => {
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

describe('Verifica função productUpdate Controllers', () => {
  
  const res = {};
  
  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.restore();
  });
  
  it('Retorna status 404', async () => {
    const req = { body: { name: 'Martelo de Thor' } }
    req.params = { id: 999 }
    sinon.stub(productsService, 'productUpdate').resolves(false);
    await productsController.productUpdate(req, res);
    expect(res.status.calledWith(404)).to.equal(true);
  });

  it('Retorna status 200 quando faz a atualização', async () => {
    const req = { body: { name: 'Martelo de Thor' } }
    req.params = { id: 999 }
    sinon.stub(productsService, 'productUpdate')
      .resolves({ id: 1, name: 'Machado do Thor Stormbreaker' });
    await productsController.productUpdate(req, res);
    expect(res.status.calledWith(200)).to.equal(true);
  });

  it('Retorna 422 quando não é passado name', async () => {
    const req = { body: { name: 'Ma' } }
    req.params = { id: 999 }
    await productsController.productUpdate(req, res);
    expect(res.status.calledWith(422)).to.equal(true);
  });

  it('Retorna 422 quando não é passado name', async () => {
    const req = { body: {} }
    req.params = { id: 999 }
    await productsController.productUpdate(req, res);
    expect(res.status.calledWith(400)).to.equal(true);
  });

});