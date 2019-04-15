const chai = require('chai');
const {expect} = chai;
chai.use(require('chai-http'));

const {app, startServer, stopServer} = require('../server');

const validLogin = {
  username: 'admin',
  password: 'admin'
};

describe('API - Auth - api/auth/', function() {
  before(startServer);
  after(stopServer);
  
  let jwt;

  it('Should reject an invalid login', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send({...validLogin, password: validLogin.password + 'a'});
    expect(res).to.have.status(401);
  });
  it('Should provide a JWT on valid login', async function() {
    const res = await chai.request(app)
      .post('/api/auth')
      .send(validLogin);
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
});