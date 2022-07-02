const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('100. Verifica função registerSale', () => {
  const productInvalid = [{ productId: 9999, quantity: 1 }, { productId: 9999, quantity: 1 }];
  const productUndefined = [{ productId: 9999, quantity: 1 }]
  const productCorrect = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

  before(() => {
    sinon.stub(salesServices, 'checkProductExists').resolves(false);
  });

  after(() => {
    sinon.restore();
  });

  it('Não permite cadastrar quando o productId não existe', async () => {
    const response = await salesServices.registerSale(productInvalid);
    const responseUndefined = await salesServices.registerSale(productUndefined);
    expect(response).to.equal(false);
    expect(responseUndefined).to.equal(false);
  });
    
  it('O objeto possui o id correto', async () => {
    const response = await salesServices.registerSale(productCorrect);
    expect(response).to.have.a.property('id');
  });
});
