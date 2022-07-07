const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('#19 GET PRODUCTS SERVICES', () => {
  describe('#listProducts', () => {
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

  describe('#findById', () => {
    const productsModelMockFalse = false;
    const productsModelMock = [
      {
        id: 1,
        name: 'Produto para testes'
      }
    ];

    before(async () => {
    });
    
    afterEach(async () => {
      productsModel.findById.restore();
    });
    
    it('O objeto recebido tem as propriedades "id", "name"', async () => {
      sinon.stub(productsModel, 'findById').resolves(productsModelMock);
      const [response] = await productsService.findById(1);
      expect(response).to.include.all.keys('id', 'name');
    });

    it('O objeto não esta vazio', async () => {
      sinon.stub(productsModel, 'findById').resolves(productsModelMock);
      const response = await productsService.findById(1);
      expect(response).to.be.not.empty;
    });

    it('Caso receba undefined, retorna false', async () => {
      sinon.stub(productsModel, 'findById').resolves(productsModelMockFalse);
      const response = await productsService.findById(1);
      expect(response).to.equal(productsModelMockFalse);
    });
  });
});

describe('#20 POST PRODUCTS SERVICES', () => {
  describe('#createProductService', () => {
    const newProduct = {
      name: 'Produto para testes'
    };
    const product = undefined;
    const execute = [{ insertId: 1 }]

    afterEach(async () => {
      sinon.restore();
    });

    it('Quando é inserido com sucesso', async () => {
      sinon.stub(productsModel, 'createProductModel').resolves(execute);
      const [response] = await productsService.createProductService(newProduct);
      expect(response).to.be.a('object');
    });

    it('O objeto possui o id correto', async () => {
      sinon.stub(productsModel, 'createProductModel').resolves(execute);
      const [response] = await productsService.createProductService(newProduct);
      expect(response).to.have.a.property('insertId');
    });

    it('Caso receba undefined, retorna false', async () => {
      sinon.stub(productsModel, 'createProductModel').resolves(product);
      const response = await productsService.createProductService(product);
      expect(response).to.equal(false);
    });
  });
});

describe('#21 UPDATE PRODUCTS SERVICES', () => {
  describe('#productUpdate', () => {
    const name = 'Machado do Thor Stormbreaker';
    const obj = { id: 1, name: 'Machado do Thor Stormbreaker' }

    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna false quando o produto não esta cadastrado no banco', async () => {
      const id = 999;
      sinon.stub(productsModel, 'productUpdate').resolves(0);
      const response = await productsService.productUpdate(id, name);
      expect(response).to.be.equal(false);
    })

    it('Retorna obj quando o produto esta cadastrado no banco', async () => {
      sinon.stub(productsModel, 'productUpdate').resolves(1);
      const id = 1;
      const response = await productsService.productUpdate(id, name);
      expect(response).to.be.deep.equal(obj);
    })
  });
});

describe('#22 DELETE PRODUCTS SERVICES', () => {
  describe('#deleteProduct', () => {
    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna false quando não existe o produto informado', async () => {
      sinon.stub(productsModel, 'deleteProduct').resolves([]);
      const response = await productsService.deleteProduct(999);
      expect(response).to.equal(false);
    });

    it('Retorna true quando o produto é deletado', async () => {
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      const response = await productsService.deleteProduct(1);
      expect(response).to.equal(true);
    });
  });
});

describe('#23 GET/SEARCH PRODUCTS SERVICES', () => {
  describe('#searchProduct', () => {
    const param = 'Martelo';
    const returnModel = [{ id: 1, name: 'Martelo de Thor' }];

    afterEach(async () => {
      sinon.restore();
    });

    it('Retorna o produto buscado', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(returnModel);
      const response = await productsService.searchProduct(param);
      expect(response).to.be.deep.equal(returnModel);
    });
  });
});