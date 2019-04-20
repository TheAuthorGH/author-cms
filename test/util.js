const _ = require('lodash');
const mongoose = require('mongoose');
const generators = require('./generators');

module.exports = {
  async seedDatabase(config = {}) {
    if(!config.keepDatabase) await mongoose.connection.dropDatabase();
    await mongoose.model('User').addUser({username: 'admin', password: 'admin'});
    for(let model of config.models || []) {
      const generator = config.generator || generators[model.key];
      await mongoose.model(model.key).insertMany(_.times(model.count || 10, generator));
    }
  },
  async getAuthToken(username = 'admin') {
    const user = await mongoose.model('User').findOne({username});
    return {Authorization: `Bearer ${user.createJwt()}`};
  }
};