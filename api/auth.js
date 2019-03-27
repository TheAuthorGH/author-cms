const config = require('../config');

const UserModel = require('../models/model-users');

const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const expressJwt = require('express-jwt');

passport.use(new LocalStrategy(
  {usernameField: 'email'},
  async (email, password, callback) => {
    const user = await UserModel.findOne({email});
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
    userProperty: 'auth',
    getToken(req) {
      const token = req.headers.authorization;
      if(token && token.split(' ')[0] === 'Bearer') {
        return token.split(' ')[1];
      }
      return null;
    }
  }),
};