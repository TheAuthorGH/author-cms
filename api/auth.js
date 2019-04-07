const config = require('../config');

const UserModel = require('../models/model-users');

const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const expressJwt = require('express-jwt');

const getToken = (req) => {
  const token = req.headers.authorization;
  if(token && token.split(' ')[0] === 'Bearer') {
    return token.split(' ')[1];
  }
  return null;
};

passport.use(new LocalStrategy(
  {usernameField: 'username'},
  async (username, password, callback) => {
    const user = await UserModel.findOne({username});
    if(!user) {
      return callback(null, false, {});
    }
    if(await user.validatePassword(password)) {
      return callback(null, user);
    }
    return callback(null, false, {});
  }
));

module.exports = {
  localAuth: passport.authenticate('local', {session: false}),
  requireAuth: expressJwt({
    secret: config.JWT_SECRET,
    getToken
  }),
  optionalAuth: expressJwt({
    secret: config.JWT_SECRET,
    getToken,
    credentialsRequired: false
  })
};