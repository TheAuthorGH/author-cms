const config = require('./config');

const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

require('./api/routes')(app);

let server;

async function startServer(port = config.PORT, dbUrl = config.DATABASE_URL) {
  await mongoose.connect(`mongodb://${dbUrl}`);
  return await new Promise((resolve, reject) =>
    server = app
      .listen(port, resolve)
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      })
  );
}

async function stopServer() {
  await mongoose.disconnect();
  return await new Promise((resolve, reject) =>
    server.close(err => {
      if(err) return reject(err);
      resolve();
    })
  );
}

async function main() {
  try {
    await startServer();
    await require('./setup')();
    console.log(chalk.green(`${chalk.blue('AuthorCMS')} is listening on port ${config.PORT}.`));
  } catch(err) {
    console.log(chalk.red(`An error ocurred while starting AuthorCMS server.`));
  }
}

if(require.main === module) main();

module.exports = {app, startServer, stopServer, main};
