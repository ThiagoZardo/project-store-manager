const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');
const { response } = require('../../../app');

describe('8. Verifica o retorno da função checkProductExists', async () => {
  const paramReceip = 1;
  const returnFuncion = [{ product_id: 1 }];

  before(async () => {
    await sinon.stub(connection, 'execute').resolves(returnFuncion);
  });

  after(async () => {
    await connection.execute.restore();
  });

  it('O objeto não esta vazio', async () => {
    const response = await salesModel.checkProductExists(paramReceip);
    expect(response).to.be.not.empty;
  });
  
  it('Retorna um objeto', async () => {
    const response = await salesModel.checkProductExists(paramReceip);
    expect(response).to.be.an('object');
  });
});

describe('9. Verifica a função registerSale Model', () => {
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

describe('10. Verifica a função registerSaleProduct Model', () => {
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

describe('Verifica função listAllSales', () => {
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

  after(async () => {
    sinon.restore();
  })

  it('Verifica se retorna os dados corretos', async () => {
    sinon.stub(connection, 'execute').resolves([returnConnection]);
    const response = await salesModel.listAllSales();
    expect(response).to.be.equal(returnConnection);
  });
});

describe('Verifica a função findBySale', () => {
  const returnConnection = [
    {
      date: '2022-07-04T16:16:42.000Z',
      product_id: 3,
      quantity: 15
    }
  ]

  before(async () => {
    sinon.stub(connection, 'execute').resolves([returnConnection]);
  });

  after(async () => {
    sinon.restore();
  });

  it('Verifica se retorna o elemento com o id esperado', async () => {
    const reponse = await salesModel.findBySale(2);
    expect(reponse).to.be.equal(returnConnection);
  });
});