const express = require('express');

module.exports = (app) => {
  app.use(express.static('public'));

  const apiRouter = express.Router();
  apiRouter.use('/users', require('./api-users'));
  apiRouter.use('/auth', require('./api-auth'));

  app.use('/api', apiRouter);
};