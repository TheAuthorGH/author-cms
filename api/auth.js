const UserModel = require('../models/model-users');

const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');

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
  localAuth: passport.authenticate('local', {session: false})
};