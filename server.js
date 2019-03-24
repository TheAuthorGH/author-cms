const config = require('./config');

const chalk = require('chalk');
const express = require('express');

const app = express();

app.use(express.static('public'));

async function startServer(port = config.PORT) {
  await new Promise((resolve, reject) =>
    server = app.listen(port, resolve).on('error', reject)
  );
}

async function main() {
  try {
    await startServer();
    console.log(chalk.green(`${chalk.blue('AuthorCMS')} is listening on port ${config.PORT}.`));
  } catch(err) {
    console.log(chalk.red(`An error ocurred while starting AuthorCMS server.`));
  }
}

if(require.main === module)
  main();

module.exports = {app, startServer, main};
