const _ = require('lodash');
const faker = require('faker');

module.exports = {
  User() {
    return {
      username: _.uniqueId('user'),
      password: faker.random.word()
    };
  },
  Story(index) {
    return {
      slug: _.uniqueId('story'),
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