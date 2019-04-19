const _ = require('lodash');
const faker = require('faker');

module.exports = {
  Story(index) {
    return {
      slug: `story-${_.uniqueId()}`,
      title: faker.random.words(),
      public: index % 2 === 0,
      parts: _.times(10, i => ({
        title: faker.random.words(),
        content: faker.lorem.paragraph()
      }))
    };
  },
  Author() {
    return {
      name: faker.name.findName()
    };
  }
};