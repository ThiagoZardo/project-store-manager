const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('100. Verifica função checkProductExists', () => {
  const productInvalid = [[]];

  before(() => {
    sinon.stub(salesModels, 'checkProductExists').resolves(productInvalid);
  });

  after(() => {
    sinon.restore();
  });

  it('Não permite cadastrar quando o productId não existe', async () => {
    const response = await salesServices.checkProductExists(productInvalid);
    expect(response).to.equal(false);
  });
});

describe('101 Verifica a função registerSale salesService', () => {
  receip = [{ productId: 9999, quantity: 1 }];

  before(async () => {
    sinon.stub(salesServices, 'checkProductExists').resolves(true);
  });

  after(async () => {
    sinon.restore();
  });

  it('Não permite cadastro de produtos que não existem', async () => {
    const response = await salesServices.registerSale(receip);
    expect(response).to.equal(false);
  });
});

describe('102. Verifica função registerSale', () => {
  const sale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
  returnRegisterSaleProduct = {
    id: 3,
    itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]
  }

  before(async () => {
    sinon.stub(salesServices, 'checkProductExists').resolves(false);
    sinon.stub(salesModels, 'registerSaleProduct').resolves(returnRegisterSaleProduct);
  });

  after(async () => {
    sinon.restore()
  });

  it('Verifica se retorna o id do produto cadastrado', async () => {
    const response = await salesServices.registerSale(sale);
    expect(response).to.equal(returnRegisterSaleProduct);
  });
});

describe('103. Verifica função registerSale', () => {
  const sale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
  
  before(async () => {
    sinon.stub(salesServices, 'checkProductExists').resolves(false);
    sinon.stub(salesModels, 'registerSaleProduct').resolves(false);
  });

  after(async () => {
    sinon.restore()
  });

  it('Verifica se retorna o id do produto cadastrado', async () => {
    const response = await salesServices.registerSale(sale);
    expect(response).to.equal(false);
  });
});

describe('102. Verifica função checkProductExists', () => {
  const sale = [{ productId: 9999, quantity: 1 }];
  const productExist = [[]];

  before(async () => {
    sinon.stub(salesModels, 'checkProductExists').resolves(productExist);
  });

  after(async () => {
    sinon.restore()
  });

  it('Verifica se retorna o id do produto cadastrado', async () => {
    const response = await salesServices.checkProductExists(sale);
    expect(response).to.equal(false);
  });
});