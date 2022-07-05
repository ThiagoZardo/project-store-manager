const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('11. Verifica retorno da função listProducts Services', () => {
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

describe('12. Verifica retorno da função findById Services', () => {
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

describe('13. Verifica a função createProductService Services', () => {
  const newProduct = {
    name: 'Produto para testes'
  };

  before(async () => {
    const execute = [{ insertId: 1 }]
    sinon.stub(productsModel, 'createProductModel').resolves(execute);
  })

  after(async () => {
    sinon.restore();
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

describe('14. Verifica retorno da função findById Services', () => {
  const productsModelMock = false;

  before(async () => {
    sinon.stub(productsModel, 'findById').resolves(productsModelMock);
  });

  after(async () => {
    productsModel.findById.restore();
  });

  it('Caso receba undefined, retorna false', async () => {
    const response = await productsService.findById(1);
    expect(response).to.equal(productsModelMock);
  });
});

describe('15. Verifica retorno da função createProductService Services', () => {
  const product = undefined;

  before(async () => {
    sinon.stub(productsModel, 'createProductModel').resolves(product);
  });

  after(async () => {
    productsModel.createProductModel.restore();
  });

  it('Caso receba undefined, retorna false', async () => {
    const response = await productsService.createProductService(product);
    expect(response).to.equal(false);
  });
});

describe('Verifica função productUpdate Services', () => {
  const name = 'Machado do Thor Stormbreaker';
  const obj = { id: 1, name: 'Machado do Thor Stormbreaker' }

  afterEach(async () => {
    sinon.restore();
  })
  
  it('Retorna false quando o produto não esta cadastrado no banco', async () => {
    const id = 999;
    const response = await productsService.productUpdate(id, name);
    sinon.stub(productsModel, 'productUpdate').resolves(0);
    expect(response).to.be.equal(false);
  })
  
  it('Retorna obj quando o produto esta cadastrado no banco', async () => {
    sinon.stub(productsModel, 'productUpdate').resolves(1);
    const id = 1;
    const response = await productsService.productUpdate(id, name);
    expect(response).to.be.deep.equal(obj);
  })
});
