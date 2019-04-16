const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const config = require('../config');
const StoryModel = require('../models/model-stories');

const {app, startServer, stopServer} = require('../server');

describe('API - Stories', function() {
  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase(require('./fixtures/fixtures-stories'));
  });
  after(stopServer);

  describe('GET /api/stories', function() {
    it('Should provide an index of stories', async function() {
      const res = await chai.request(app).get('/api/stories');
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['pages', 'recordCount', 'records']);
    });
  });

  describe('GET /api/stories/:slug', function() {
    it('Should provide a complete Story record for a given slug', async function() {
      const story = await StoryModel.findOne();
      const res = await chai.request(app).get(`/api/stories/${story.slug}`);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['title', 'slug', 'creationDate', 'public', 'parts']);
      expect(res.body.slug).to.equal(story.slug);
    });
  });
});