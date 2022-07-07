const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('#10 GET PRODUCTS MODELS', () => {
  describe('#listProducts', () => {
    const productsModelMock = [
      {
        id: 1,
        name: 'Produto para testes'
      }
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(productsModelMock);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um Objeto', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('object');
    });

    it('O objeto não esta vazio', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.not.empty;
    });
  });

  describe('#findById', () => {
    const productsModelMock = [
      [
        {
          id: 1,
          name: 'Produto para testes'
        }
      ]
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(productsModelMock);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('O objeto recebido tem as propriedades "id", "name"', async () => {
      const response = await productsModel.findById(1);
      expect(response).to.include.all.keys('id', 'name');
    });

    it('O objeto não esta vazio', async () => {
      const response = await productsModel.findById(1);
      expect(response).to.be.not.empty;
    })
  });
});

describe('#11 POST PRODUCTS MODELS', () => {
  describe('#createProductModel', () => {
    const newProduct = {
      name: 'Produto para testes'
    };

    before(async () => {
      const execute = [{ insertId: 1 }]
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
      connection.execute.restore();
    });

    it('Quando é inserido com sucesso', async () => {
      const response = await productsModel.createProductModel(newProduct);
      expect(response).to.be.a('object');
    });

    it('O objeto possui o id correto', async () => {
      const response = await productsModel.createProductModel(newProduct);
      expect(response).to.have.a.property('id');
    });
  });
});

describe('#12 UPDATE PRODUCTS MODELS', () => {
  describe('#productUpdate', () => {
    const newProduct = {
      id: 1,
      name: 'Machado do Thor Stormbreaker'
    };

    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna o número de linhas que foram atualizadas no banco', async () => {
      sinon.stub(connection, 'execute').resolves([ResultSetHeader = {
        affectedRows: 1,
      }]);
      const exist = await productsModel.productUpdate(newProduct)
      expect(exist).to.be.equal(1);
    });
  });
});

describe('#13 DELETE PRODUCTS MODELS', () => {
  describe('#deleteProduct', () => {
    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna o número de linhas afetadas', async () => {
      sinon.stub(connection, 'execute').resolves([
        ResultSetHeader = {
          affectedRows: 1,
        }]
      );
      const response = await productsModel.deleteProduct(1);
      expect(response).to.be.deep.equal(1);
    });
  });
});

describe('#14 GET/SEARCH PRODUCTS MODELS', () => {
  describe('#searchProduct', () => {
    const returnConnection = [{ id: 1, name: 'Martelo de Thor' }];
    const param = 'Martelo';

    afterEach(async () => {
      sinon.restore();
    })

    it('Retorna o número de linhas afetadas', async () => {
      sinon.stub(connection, 'execute').resolves([returnConnection]);
      const response = await productsModel.searchProduct(param);
      expect(response).to.be.deep.equal(returnConnection);
    });
  });
});