const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const generators = require('./generators');
const config = require('../config');
const StoryModel = require('../models/model-stories');

const {app, startServer, stopServer} = require('../server');

describe('API - Stories', function() {
  let authHeader;

  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase({
      models: [{key: 'Story'}]
    });
    authHeader = await util.getAuthToken();
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

  describe('POST /api/stories', function() {
    it('Should allow creating a new Story record', async function() {
      const newStory = generators.Story();
      const res = await chai.request(app)
        .post('/api/stories')
        .set(authHeader)
        .send(newStory);
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['slug', 'creationDate']);
      const story = await StoryModel.findOne({slug: res.body.slug});
      expect(story).to.not.be.null;
    });
  });

  describe('PUT /api/stories/parts/:slug', function() {
    it('Should allow setting a Story record\'s parts', async function() {
      let story = await StoryModel.findOne();
      const {parts} = generators.Story();
      const res = await chai.request(app)
        .put(`/api/stories/parts/${story.slug}`)
        .set(authHeader)
        .send(parts);
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
      story = await StoryModel.findOne({slug: story.slug});
      expect(story.parts.length).to.equal(parts.length);
      parts.forEach(function(part, index) {
        expect(part.title).to.equal(story.parts[index].title);
        expect(part.content).to.equal(story.parts[index].content);
      });
    });
  });

  describe('PATCH /api/stories/:slug', function() {
    it('Should allow updating a Story record', async function() {
      let story = await StoryModel.findOne();
      const patches = {
        title: story.title + 'lorem'
      };
      const res = await chai.request(app)
        .patch(`/api/stories/${story.slug}`)
        .set(authHeader)
        .send(patches);
      expect(res).to.have.status(204);
      story = await StoryModel.findOne({slug: story.slug});
      expect(story.title).to.equal(patches.title);
    });
  });

  describe('DELETE /api/stories', function() {
    it('Should allow deleting a Story record', async function() {
      const {slug} = await StoryModel.findOne();
      const res = await chai.request(app)
        .delete(`/api/stories/${slug}`)
        .set(authHeader);
      expect(res).to.have.status(204);
      expect(await StoryModel.findOne({slug})).to.be.null;
    });
  });
});