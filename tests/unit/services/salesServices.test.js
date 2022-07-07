const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('#24 GET SALES SERVICES', () => {
  describe('#checkProductExists', () => {
    const productInvalid = [[]];
    const sale = [{ productId: 9999, quantity: 1 }];
    const productExist = [[]];
    
    afterEach(() => {
      sinon.restore();
    });
    
    it('Não permite cadastrar quando o productId não existe', async () => {
      sinon.stub(salesModels, 'checkProductExists').resolves(productInvalid);
      const response = await salesServices.checkProductExists(productInvalid);
      expect(response).to.equal(false);
    });

    it('Verifica se retorna o id do produto cadastrado', async () => {
      sinon.stub(salesModels, 'checkProductExists').resolves(productExist);
      const response = await salesServices.checkProductExists(sale);
      expect(response).to.equal(false);
    });
  });

  describe('#serialize', () => {
    const sales = [
      {
        sale_id: 1,
        date: '2022-07-04T19:50:32.000Z',
        product_id: 1,
        quantity: 5
      },
    ];

    const resolves = [
      {
        saleId: 1,
        date: '2022-07-04T19:50:32.000Z',
        productId: 1,
        quantity: 5
      },
    ];

    it('retorna chaves em formato camelCase', async () => {
      const response = await salesServices.serialize(sales);
      expect(response).to.be.deep.equal(resolves);
    });
  });

  describe('#findBySale', () => {
    const sale = [
      { date: '2022-07-04T20:17:08.000Z', product_id: 1, quantity: 5 },
      { date: '2022-07-04T20:17:08.000Z', product_id: 2, quantity: 10 }
    ];

    const saleCamelCase = [
      { date: '2022-07-04T20:17:08.000Z', productId: 1, quantity: 5 },
      { date: '2022-07-04T20:17:08.000Z', productId: 2, quantity: 10 }
    ];
    
    afterEach(async () => {
      sinon.restore();
    })
    
    it('verifica o retorno da função', async () => {
      sinon.stub(salesModels, 'findBySale').resolves(sale);
      const response = await salesServices.findBySale(1);
      expect(response).to.be.deep.equal(saleCamelCase);
    });

    it('Verifica se retorna false', async () => {
      sinon.stub(salesModels, 'findBySale').resolves([]);
      const response = await salesServices.findBySale(999);
      expect(response).to.be.equal(false);
    });
  });

  describe('#listAllSales', () => {
    const sales = [
      {
        sale_id: 1,
        date: '2022-07-04T19:50:32.000Z',
        product_id: 1,
        quantity: 5
      },
    ];

    const resolves = [
      {
        saleId: 1,
        date: '2022-07-04T19:50:32.000Z',
        productId: 1,
        quantity: 5
      },
    ]

    beforeEach(async () => {
      sinon.stub(salesModels, 'listAllSales').resolves(sales)
      sinon.stub(salesServices, 'serialize').resolves(resolves);
    })
    afterEach(async () => {
      sinon.restore();
    })

    it('Verifica retorno da função', async () => {
      const response = await salesServices.listAllSales();
      expect(response).to.be.deep.equal(resolves);
    })
  });
});

describe('#25 POST SALES SERVICES', () => {
  describe('#registerSale', () => {
    receip = [{ productId: 9999, quantity: 1 }];
    const sale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
    returnRegisterSaleProduct = {
      id: 3,
      itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
    };
   
    afterEach(async () => {
      sinon.restore();
    })
    
    it('Não permite cadastro de produtos que não existem', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(true);
      sinon.stub(salesModels, 'checkProductExists').resolves([]);
      const response = await salesServices.registerSale(receip);
      expect(response).to.equal(false);
    });

    it('Verifica se retorna o id do produto cadastrado', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
      sinon.stub(salesModels, 'checkProductExists').resolves([sale]);
      sinon.stub(salesModels, 'registerSaleProduct').resolves(returnRegisterSaleProduct);
      const response = await salesServices.registerSale(sale);
      expect(response).to.deep.equal(returnRegisterSaleProduct);
    });

    it('Verifica se retorna o id do produto cadastrado', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
    sinon.stub(salesModels, 'checkProductExists').resolves([sale]);
      sinon.stub(salesModels, 'registerSaleProduct').resolves(false);
      const response = await salesServices.registerSale(sale);
      expect(response).to.equal(false);
    });
  });
});

describe('#26 UPDATE SALES SERVICES', () => {
  describe('#saleUpdate', () => {
    const productInvalid = [{ productId: 9999, quantity: 1 }];
    const productValid = [{ productId: 1, quantity: 1 }];

    afterEach(async () => {
      sinon.restore();
    });
  
    it('Retorna 404 quando o produto não existe', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(true);
      sinon.stub(salesModels, 'checkProductExists').resolves([]);
      const response = await salesServices.saleUpdate(productInvalid, 1);
      expect(response).to.be.deep.equal({
        code: 404,
        message: { message: 'Product not found' },
      });
    });
    
    it('Retorna 404 quando a venda não existe', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
      sinon.stub(salesModels, 'checkProductExists').resolves([1]);
      sinon.stub(salesModels, 'saleUpdate').resolves(false);

      const response = await salesServices.saleUpdate(productInvalid, 1);
      expect(response).to.be.deep.equal({
        code: 404,
        message: { message: 'Sale not found' },
      });
    });

    it('Retorna 200 quando a venda é atualizada', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
      sinon.stub(salesModels, 'checkProductExists').resolves([1]);
      sinon.stub(salesModels, 'saleUpdate').resolves([{
        saleId: '1',
        itemsUpdated: [{ productId: 1, quantity: 1 }]
      }]);

      const response = await salesServices.saleUpdate(productValid, 1);
      expect(response).to.be.deep.equal({
        code: 200,
        message: [
          {  
            saleId: '1',
            itemsUpdated: [{ productId: 1, quantity: 1 }]
          },
        ]
      });
    });
  });
});

describe('#27 DELETE SALES SERVICES', () => {
  describe('#deleteSale', () => {
    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna false quando não existe a venda informada', async () => {
      sinon.stub(salesModels, 'deleteSale').resolves([]);
      const response = await salesServices.deleteSale(999);
      expect(response).to.equal(false);
    });

    it('Retorna true quando a venda foi deletada corretamente', async () => {
      sinon.stub(salesModels, 'deleteSale').resolves(1);
      const response = await salesServices.deleteSale(1);
      expect(response).to.equal(true);
    });
  });
});
