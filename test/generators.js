const _ = require('lodash');
const faker = require('faker');

module.exports = {
  Story(index) {
    return {
      slug: `story-${_.uniqueId()}`,
      title: faker.random.words(),
      public: index % 2 === 0
    };
  },
  Author() {
    return {
      name: faker.name.findName()
    };
  }
};