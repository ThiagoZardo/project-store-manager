const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('#14 GET SALES SERVICES', () => {
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
    ]

    const resolves = [
      {
        saleId: 1,
        date: '2022-07-04T19:50:32.000Z',
        productId: 1,
        quantity: 5
      },
    ]

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

  describe('#listAllSales Service', () => {
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

    before(async () => {
      sinon.stub(salesModels, 'listAllSales').resolves(sales)
      sinon.stub(salesServices, 'serialize').resolves(resolves);
    })
    after(async () => {
      sinon.restore();
    })

    it('Verifica retorno da função', async () => {
      const response = await salesServices.listAllSales();
      expect(response).to.be.deep.equal(resolves);
    })
  });
});

describe('#15 POST SALES SERVICES', () => {
  describe('#registerSale salesService', () => {
    receip = [{ productId: 9999, quantity: 1 }];
    const sale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
    returnRegisterSaleProduct = {
      id: 3,
      itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
    }

    afterEach(async () => {
      sinon.restore();
    });

    it('Não permite cadastro de produtos que não existem', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(true);
      const response = await salesServices.registerSale(receip);
      expect(response).to.equal(false);
    });

    it('Verifica se retorna o id do produto cadastrado', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
      sinon.stub(salesModels, 'registerSaleProduct').resolves(returnRegisterSaleProduct);
      const response = await salesServices.registerSale(sale);
      expect(response).to.equal(returnRegisterSaleProduct);
    });

    it('Verifica se retorna o id do produto cadastrado', async () => {
      sinon.stub(salesServices, 'checkProductExists').resolves(false);
      sinon.stub(salesModels, 'registerSaleProduct').resolves(false);
      const response = await salesServices.registerSale(sale);
      expect(response).to.equal(false);
    });
  });
});
