const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));
const util = require('./util');
const config = require('../config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/model-users');

const {app, startServer, stopServer} = require('../server');

const credentials = {
  username: 'admin',
  password: 'admin'
};

describe('API - Auth [/api/auth]', function() {
  let user;
  let token;

  before(async function() {
    await startServer(config.PORT, config.TEST_DATABASE_URL);
    await util.seedDatabase();
    user = await UserModel.addUser(credentials);
  });
  after(stopServer);

  it('Should reject an invalid login [/api/auth]', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send({...credentials, password: credentials.password + 'a'});
    expect(res).to.have.status(401);
  });
  it('Should provide a JWT on valid login [/api/auth]', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send(credentials);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('string');
    token = res.body;
    const payload = jwt.verify(token, config.JWT_SECRET);
    expect(payload).to.have.keys(['id', 'iat', 'exp', 'sub']);
    expect(payload.id).to.equal(user._id.toString());
  });
  it('Should allow refreshing a valid JWT [/api/auth/refresh]', async function() {
    const res = await chai.request(app)
      .post('/api/auth/refresh')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('string');
    token = res.body;
    const payload = jwt.verify(token, config.JWT_SECRET);
    expect(payload).to.have.keys(['id', 'iat', 'exp', 'sub']);
    expect(payload.id).to.equal(user._id.toString());
  });
  it('Should provide info about current user [/api/auth/user]', async function() {
    const res = await chai.request(app)
      .get('/api/auth/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.include.keys(['id', 'username']);
    expect(res.body.id).to.equal(user._id.toString());
    expect(res.body.username).to.equal(user.username);
  });
});