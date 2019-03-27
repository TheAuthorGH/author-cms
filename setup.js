const chalk = require('chalk');

const config = require('./config');

const UserModel = require('./models/model-users');

module.exports = async function() {
  if(await UserModel.estimatedDocumentCount() < 1) {
    console.log(chalk.gray('Creating default admin user.'));
    await UserModel.addUser({
      email: 'admin',
      password: 'admin'
    });
  }
};