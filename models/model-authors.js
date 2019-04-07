const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

authorSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name
  };
};

module.exports = mongoose.model('Author', authorSchema);