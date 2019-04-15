const mongoose = require('mongoose');

module.exports = {
  async seedDatabase(fixtures = {}) {
    await mongoose.connection.dropDatabase();
    for(let key of Object.keys(fixtures)) {
      await mongoose.model(key).insertMany(fixtures[key]);
    }
  }
};