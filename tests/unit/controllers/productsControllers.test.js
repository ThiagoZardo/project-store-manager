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
