const sinon = require('sinon');
const { expect } = require('chai');

const salesControlles = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');
const { listAllSales } = require('../../../models/salesModels');

describe('5. Verifica o retorno da função registerSale', () => {
  const response = {};
  const request = {};

  const param = [{ productId: 9999, quantity: 1 }];

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.restore();
  });
  
  it('é retornado o código 201', async () => {
    sinon.stub(salesServices, 'registerSale').resolves(param);
    await salesControlles.registerSale(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  })
});

describe('6. Verifica quando o retorno da função findById retorna false Controllers', () => {
  const request = {}
  const response = {};
  const returnProductService = false;

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.restore();
  });
  
  it('é retornado o código 404 em caso de erro', async () => {
    sinon.stub(salesServices, 'registerSale').resolves(returnProductService);
    await salesControlles.registerSale(request, response);
    expect(response.status.calledWith(404)).to.equal(true);
  });
});

describe('Verifica função listAllSales', () => {
  const request = {}
  const response = {};

  const sale = [
    {
      saleId: 1,
      date: '2022-07-04T20:36:43.000Z',
      productId: 1,
      quantity: 5
    },
  ]

  beforeEach(async () => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.restore();
  });
   
  it('Retorna o código 200 quando a requisição é respondida com exito', async () => {
    sinon.stub(salesServices, 'listAllSales').resolves(sale);
    await salesControlles.listAllSales(request, response);
    expect(response.status.calledWith(200)).to.equal(true);
  });
});

describe('Verifica função findBySale', () => {
  const req = {};
  const res = {};
  req.params = { id: 999 };

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.restore();
  });

  it('Retorna status 404', async () => {
    sinon.stub(salesServices, 'findBySale').resolves(false);         
    await salesControlles.findBySale(req, res);
    expect(res.status.calledWith(404)).to.equal(true);
  });
  
  it('Retorna status 200', async () => {
    sinon.stub(salesServices, 'findBySale').resolves([
      { date: '2022-07-04T21:44:07.000Z', productId: 1, quantity: 5 },
      { date: '2022-07-04T21:44:07.000Z', productId: 2, quantity: 10 }
    ]);
    await salesControlles.findBySale(req, res);
    expect(res.status.calledWith(200)).to.equal(true);
  });
});
