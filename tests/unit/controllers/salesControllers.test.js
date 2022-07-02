const sinon = require('sinon');
const { expect } = require('chai');

const salesControlles = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');

describe('5. Verifica o retorno da função registerSale', () => {
  const response = {};
  const request = {};

  const param = [{ productId: 9999, quantity: 1 }];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesServices, 'registerSale').resolves(param);
  });

  after(() => {
    sinon.restore();
  });

  it('é retornado o código 201', async () => {
    await salesControlles.registerSale(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  })
});

describe('6. Verifica quando o retorno da função findById retorna false Controllers', () => {
  const request = {}
  const response = {};
  const returnProductService = false;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesServices, 'registerSale').resolves(returnProductService);
  });

  after(() => {
    sinon.restore();
  });

  it('é retornado o código 404 em caso de erro', async () => {
    await salesControlles.registerSale(request, response);
    expect(response.status.calledWith(404)).to.equal(true);
  });
});