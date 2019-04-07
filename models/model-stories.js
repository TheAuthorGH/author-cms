const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

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
  author: {type: ObjectId, ref: 'Author'},
  title: {type: String, required: true},
  creationDate: {type: Date, default: new Date()},
  public: {type: Boolean, default: false},
  parts: [partSchema]
});

storySchema.methods.serialize = function() {
  return {
    slug: this.slug,
    author: this.author && this.author.serialize(),
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

module.exports = mongoose.model('Story', storySchema);