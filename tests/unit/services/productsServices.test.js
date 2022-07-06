const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('#11 GET PRODUCTS SERVICES', () => {
  describe('#listProducts Services', () => {
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

  describe('#findById Services', () => {
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

describe('#12 POST PRODUCTS SERVICES', () => {
  describe('#createProductService Services', () => {
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

describe('#13 UPDATE PRODUCTS SERVICES', () => {
  describe('#productUpdate Services', () => {
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
