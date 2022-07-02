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

describe('Verifica a função registerSale salesService', () => {
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