const sinon = require('sinon');
const { expect } = require('chai');

const salesControlles = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');
const { listAllSales } = require('../../../models/salesModels');

describe('#6 POST SALES CONTROLLERS', () => {
  describe('#registerSale', () => {
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
})

describe('#7 GET SALES CONTROLLERS', () => {
  describe('#findById', () => {
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

  describe('#listAllSales', () => {
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

  describe('#findBySale', () => {
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
});

describe('#8 UPDATE SALES CONTROLERS', () => {
  describe('#saleUpdate', () => {
    const res = {};

    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.restore();
    });

    it('Retorna status 404', async () => {
      const req = { body: { name: 'Martelo de Thor' } }
      req.params = { id: 999 }
      sinon.stub(salesServices, 'saleUpdate').resolves(true);
      await salesControlles.saleUpdate(req, res);
      expect(res.status.calledWith(404)).to.equal(false);
    });
  });
});

describe('#9 DELETE SALES CONTROLLERS', () => {
  describe('#deleteSale', async () => {
    const req = {}
    const res = {};
    req.params = { id: 1 }

    beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Retorna 404 quando não encontra o produto', async () => {
    sinon.stub(salesServices, 'deleteSale').resolves(true);
    await salesControlles.deleteSale(req, res);
    expect(res.status.calledWith(204)).to.equal(true);
  });

  it('Retorna 404 quando não encontra o produto', async () => {
    sinon.stub(salesServices, 'deleteSale').resolves(false);
    await salesControlles.deleteSale(req, res);
    expect(res.status.calledWith(404)).to.equal(true);
  });
  });
});