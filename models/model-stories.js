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
  publicationDate: {type: Date},
  parts: [partSchema],

  creationDate: {type: Date, default: new Date()},
  public: {type: Boolean, default: false}
});

storySchema.methods.serialize = function(options = {}) {
  const obj = {
    slug: this.slug,
    author: this.author && this.author.serialize(),
    title: this.title,
    publicationDate: this.publicationDate,    
  };

  if(options.parts)
    obj.parts = this.parts.map(part => part.serialize());
  else
    obj.parts = this.parts.map(part => ({
      title: part.title
    }));

  if(options.cmsMeta) {
    obj.cmsMeta = {
      creationDate: this.creationDate,
      public: this.public
    };
  }

  return obj;
};

module.exports = mongoose.model('Story', storySchema);