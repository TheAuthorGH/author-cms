const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const config = require('../config');
const StoryModel = require('../models/model-stories');

const {app, startServer, stopServer} = require('../server');

describe('API - Stories [/api/stories]', function() {
  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase(require('./fixtures/fixtures-stories'));
  });
  after(stopServer);

  it('Should return an index of stories [/api/stories/]', async function() {
    const res = await chai.request(app).get('/api/stories');
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['pages', 'recordCount', 'records']);
  });
  it('Should return a complete Story record for a given slug [/api/stories/:slug]', async function() {
    const story = await StoryModel.findOne();
    const res = await chai.request(app).get(`/api/stories/${story.slug}`);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['title', 'slug', 'creationDate', 'public', 'parts']);
    expect(res.body.slug).to.equal(story.slug);
  });
});