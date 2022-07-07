const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');

describe('#15 GET SALES MODELS', () => {
  describe('#checkProductExists', () => {
    const returnFuncion = [{ product_id: 1 }];
    
    beforeEach(async () => {
      sinon.restore();
    });
    
    it('Retorna um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([returnFuncion]);
      const response = await salesModel.checkProductExists(1);
      expect(response).to.be.deep.equal(returnFuncion);
    });
  });

  describe('#listAllSales', () => {
    const returnConnection = [
      {
        sale_id: 1,
        date: '2022-07-04T16:02:11.000Z',
        product_id: 1,
        quantity: 5
      },
      {
        sale_id: 1,
        date: '2022-07-04T16:02:11.000Z',
        product_id: 2,
        quantity: 10
      },
      {
        sale_id: 2,
        date: '2022-07-04T16:02:11.000Z',
        product_id: 3,
        quantity: 15
      }
    ]

    beforeEach(async () => {
      sinon.restore();
    })

    it('Verifica se retorna os dados corretos', async () => {
      sinon.stub(connection, 'execute').resolves([returnConnection]);
      const response = await salesModel.listAllSales();
      expect(response).to.be.equal(returnConnection);
    });
  });

  describe('#findBySale', () => {
    const returnConnection = [
      {
        date: '2022-07-04T16:16:42.000Z',
        product_id: 3,
        quantity: 15
      }
    ]

    beforeEach(async () => {
      sinon.restore();
    });

    afterEach(async () => {
      sinon.restore();
    });
        
    it('Verifica se retorna o elemento com o id esperado', async () => {
      sinon.stub(connection, 'execute').resolves([returnConnection]);
      const reponse = await salesModel.findBySale(2);
      expect(reponse).to.be.equal(returnConnection);
    });
  });
});

describe('#16 POST SALES MODELS', () => {
  describe('#registerSale', () => {
    const ResultSetHeader = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 3,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(ResultSetHeader);
    });

    after(async () => {
      sinon.restore();
    });

    it('O objeto não esta vazio', async () => {
      const response = await salesModel.registerSale();
      expect(response).to.be.not.empty;
    });

    it('O objeto recebido contem a chave insertId', async () => {
      const response = await salesModel.registerSale();
      expect(response).to.include.all.keys('insertId');
    });
  });

  describe('#registerSaleProduct', () => {
    const mockRegisterSale = [
      {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 }
        ]
      }
    ];

    const param = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 }
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(mockRegisterSale);
    });

    after(async () => {
      sinon.restore();
    });

    it('O objeto não esta vazio', async () => {
      const response = await salesModel.registerSaleProduct(param);
      expect(response).to.be.not.empty;
    });

    it('O objeto recebido contem a chave insertId', async () => {
      const response = await salesModel.registerSaleProduct(param);
      expect(response).to.include.all.keys('itemsSold');
    });
  });
});

describe('#17 UPDATE SALES MODELS', () => {
  describe('#saleUpdate', () => {
    const sale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
    const obj = {
      saleId: 1,
      itemsUpdated: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
    }

    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna false se não existe o id da venda no banco', async () => {
      sinon.stub(connection, 'execute').resolves([
        ResultSetHeader = {
          affectedRows: 0,
        },
      ]);
      const response = await salesModel.saleUpdate(sale, 999)
      expect(response).to.be.equal(false);
    });

    it('Retorna o objeto que foi atualizado', async () => {
      sinon.stub(connection, 'execute').resolves([
        ResultSetHeader = {
          affectedRows: 1,
        },
      ]);
      const response = await salesModel.saleUpdate(sale, 1)
      expect(response).to.be.deep.equal(obj);
    });
  });
})

describe('#18 DELETE SALES SALESMODELS', () => {
  describe('#deleteSale', () => {
    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna o número de linhas afetadas', async () => {
      sinon.stub(connection, 'execute').resolves([
        ResultSetHeader = {
          affectedRows: 1,
        }]
      );
      const response = await salesModel.deleteSale(1);
      expect(response).to.be.deep.equal(1);
    });
  })
});
