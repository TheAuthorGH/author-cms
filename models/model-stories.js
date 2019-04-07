const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  title: {type: String},
  content: {type: String}
});

partSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content
  };
};

const storySchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  creationDate: {type: Date, default: new Date()},
  public: {type: Boolean, default: false},
  parts: [partSchema]
});

storySchema.methods.serialize = function() {
  return {
    slug: this.slug,
    title: this.title,
    creationDate: this.creationDate,
    public: this.public,
    parts: this.parts.map(part => ({
      title: part.title
    }))
  };
};

storySchema.methods.serializeWithParts = function() {
  return {
    ...this.serialize(),
    parts: this.parts.map(part => part.serialize())
  };
};

storySchema.methods.part = function(index) {
  return this.parts[index] && this.parts[index].serialize();
};

module.exports = mongoose.model('Story', storySchema);