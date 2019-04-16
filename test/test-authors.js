const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const config = require('../config');
const AuthorModel = require('../models/model-authors');

const {app, startServer, stopServer} = require('../server');

describe('API - Authors', async function() {
  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase(require('./fixtures/fixtures-authors'));
  });
  after(stopServer);

  describe('GET /api/authors', function() {
    it('Should provide an index of authors', async function() {
      const res = await chai.request(app).get('/api/authors');
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['pages', 'recordCount', 'records']);
    });
  });
  
  describe('GET /api/authors/:id', function() {
    it('Should provide a complete Author record for a given id', async function() {
      const author = await AuthorModel.findOne();
      const res = await chai.request(app).get(`/api/authors/${author._id}`);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['id', 'name']);
      expect(res.body.id).to.equal(author._id.toString());
    });
  });
});