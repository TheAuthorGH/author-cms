const config = require('../config');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String},
  password: {type: String, required: true}
});

userSchema.statics.addUser = async function(user) {
  user = {...user};
  user.password = await bcrypt.hash(user.password, config.HASH_SALT);
  return new this(user).save();
};

userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, config.HASH_SALT);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJwt = function() {
  const payload = {
    id: this._id
  };
  return jwt.sign(payload, config.JWT_SECRET, {
    subject: this.id.toString(),
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
};

module.exports = mongoose.model('User', userSchema);
