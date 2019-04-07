const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  public: {type: Boolean, default: false}
});

storySchema.methods.serialize = function() {
  return {
    slug: this.slug,
    title: this.title,
    public: this.public
  }
};

module.exports = mongoose.model('Story', storySchema);