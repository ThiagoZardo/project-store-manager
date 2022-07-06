const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('#6 GET PRODUCTS MODELS', () => {
  describe('#listProducts Models', () => {
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

  describe('#findById Models', () => {
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

describe('#7 POST PRODUCTS MODELS', () => {
  describe('#createProductModel Models', () => {
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

describe('#8 UPDATE PRODUCTS MODELS', () => {
  describe('#productUpdate Models', () => {
    describe('#productUpdate', () => {
      const newProduct = {
        id: 1,
        name: 'Machado do Thor Stormbreaker'
      };
      it('Retorna o número de linhas que foram atualizadas no banco', async () => {
        sinon.stub(connection, 'execute').resolves([ResultSetHeader = {
          affectedRows: 1,
        }]);
        const exist = await productsModel.productUpdate(newProduct)
        expect(exist).to.be.equal(1);
      });
    });
  })
});
