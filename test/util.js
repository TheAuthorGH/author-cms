const mongoose = require('mongoose');

module.exports = {
  async seedDatabase(fixtures = {}) {
    await mongoose.connection.dropDatabase();
    await mongoose.model('User').addUser({username: 'admin', password: 'admin'});
    for(let key of Object.keys(fixtures)) {
      await mongoose.model(key).insertMany(fixtures[key]);
    }
  },
  async getAuthToken(username = 'admin') {
    const user = await mongoose.model('User').findOne({username});
    return {Authorization: `Bearer ${user.createJwt()}`};
  }
};