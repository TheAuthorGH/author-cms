const chalk = require('chalk');

const UserModel = require('./models/model-users');

module.exports = async function() {
  if(await UserModel.estimatedDocumentCount() < 1) {
    console.log(chalk.gray('Creating default admin user.'));
    await UserModel.addUser({
      username: 'admin',
      password: 'admin'
    });
  }
};