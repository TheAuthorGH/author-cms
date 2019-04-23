const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const generators = require('./generators');
const config = require('../config');
const UserModel = require('../models/model-users');

const {app, startServer, stopServer} = require('../server');

describe('API - Users', function() {
  let authHeader;

  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase();
    authHeader = await util.getAuthToken();
  });
  after(stopServer);

  describe('POST /api/users', function() {
    it('Should allow creating a new User record', async function() {
      const newUser = generators.User();
      const res = await chai.request(app)
        .post('/api/users')
        .set(authHeader)
        .send(newUser);
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.include.keys(['id', 'username']);
      const user = await UserModel.findById(res.body.id);
      expect(user).to.not.be.null;
      expect(user.username).to.equal(newUser.username);
    });
    it('Should require a username and password', async function() {
      const res = await chai.request(app)
        .post('/api/users')
        .set(authHeader)
        .send({});
      expect(res).to.have.status(400);
    });
    it('Should not allow username duplication', async function() {
      const username = (await UserModel.findOne()).username;
      const res = await chai.request(app)
        .post('/api/users')
        .set(authHeader)
        .send({...generators.User(), username});
      expect(res).to.have.status(400);
    });
  });
});