const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('1. Verifica retorno da função listProducts', () => {
  const productsModelMock = [
    {
      id: 1,
      name: 'Produto para testes'
    }
  ];

  before(() => {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsModelMock);
  });

  after(() => {
    productsModel.getAllProducts.restore();
  });

  it('retorna um objeto', async () => {
    const [response] = await productsService.getAll();
    expect(response).to.be.an('object');
  });

  it('o array não esta vazio', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.not.empty;
  });
});

describe('2. Verifica retorno da função findById', () => {
  const productsModelMock = [
    {
      id: 1,
      name: 'Produto para testes'
    }
  ];

  before(async () => {
    sinon.stub(productsModel, 'findById').resolves(productsModelMock);
  });

  after(async () => {
    productsModel.findById.restore();
  });

  it('O objeto recebido tem as propriedades "id", "name"', async () => {
    const [response] = await productsService.findById(1);
    expect(response).to.include.all.keys('id', 'name');
  });

  it('O objeto não esta vazio', async () => {
    const response = await productsService.findById(1);
    expect(response).to.be.not.empty;
  });
});

describe('3. Verifica a função createProductService', () => {
  const newProduct = {
    name: 'Produto para testes'
  };

  before(async () => {
    const execute = [{ insertId: 1 }]
    sinon.stub(productsModel, 'createProductModel').resolves(execute);
  })

  after(async () => {
    productsModel.createProductModel.restore
  });

  it('Quando é inserido com sucesso', async () => {
    const [response] = await productsService.createProductService(newProduct);
    expect(response).to.be.a('object');
  });

  it('O objeto possui o id correto', async () => {
    const [response] = await productsService.createProductService(newProduct);
    expect(response).to.have.a.property('insertId');
  });
});

describe('4. Verifica retorno da função findById', () => {
  const productsModelMock = { message: 'Product not found' }

  before(async () => {
    sinon.stub(productsModel, 'findById').resolves(productsModelMock);
  });

  after(async () => {
    productsModel.findById.restore();
  });

  it('Caso receba undefined, retorna false', async () => {
    const response = await productsService.findById(5);
    expect(response).to.be.equal(productsModelMock);
  });
});