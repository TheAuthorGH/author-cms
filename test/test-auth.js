const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const UserModel = require('../models/model-users');
const util = require('./util');
const config = require('../config');

const {app, startServer, stopServer} = require('../server');

const credentials = {
  username: 'admin',
  password: 'admin'
};

describe('API - Auth - api/auth/', function() {
  let user;
  let jwt;

  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase();
    user = await UserModel.addUser(credentials);
  });
  after(stopServer);

  it('Should reject an invalid login', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send({...credentials, password: credentials.password + 'a'});
    expect(res).to.have.status(401);
  });
  it('Should provide a JWT on valid login', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send(credentials);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('string');
    jwt = res.body;
  });
  it('Should allow refreshing a valid JWT', async function() {
    const res = await chai.request(app)
      .post('/api/auth/refresh')
      .set('Authorization', `Bearer ${jwt}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('string');
  });
  it('Should provide info about current user', async function() {
    const res = await chai.request(app)
      .get('/api/auth/user')
      .set('Authorization', `Bearer ${jwt}`);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['id', 'username']);
    expect(res.body.id).to.equal(user._id.toString());
    expect(res.body.username).to.equal(user.username);
  });
});