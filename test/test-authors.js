const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const generators = require('./generators');
const config = require('../config');
const AuthorModel = require('../models/model-authors');

const {app, startServer, stopServer} = require('../server');

describe('API - Authors', function() {
  let authHeader;

  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase({
      models: [{key: 'Author'}]
    });
    authHeader = await util.getAuthToken();
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

  describe('POST /api/authors', function() {
    it('Should allow creating a new Author record', async function() {
      const newAuthor = generators.Author();
      const res = await chai.request(app)
        .post('/api/authors')
        .set(authHeader)
        .send(newAuthor);
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['id', 'name']);
      const author = await AuthorModel.findById(res.body.id);
      expect(author).to.not.be.null;
      expect(author.name).to.equal(newAuthor.name);
    });
  });

  describe('PATCH /api/authors/:id', function() {
    it('Should allow updating an Author record', async function() {
      let author = await AuthorModel.findOne();
      const patches = {
        name: author.name + 'lorem'
      };
      const res = await chai.request(app)
        .patch(`/api/authors/${author._id}`)
        .set(authHeader)
        .send(patches);
      expect(res).to.have.status(204);
      author = await AuthorModel.findById(author._id);
      expect(author.name).to.equal(patches.name);
    });
  });

  describe('DELETE /api/authors/:id', function() {
    it('Should allow deleting an Author record', async function() {
      const authorId = (await AuthorModel.findOne())._id;
      const res = await chai.request(app)
        .delete(`/api/authors/${authorId}`)
        .set(authHeader);
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
      expect(await AuthorModel.findById(authorId)).to.be.null;
    });
  });
});