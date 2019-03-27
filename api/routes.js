const express = require('express');

module.exports = (app) => {
  app.use(express.static('public'));

  const apiRouter = express.Router();
  apiRouter.use('/users', require('./api-users'));

  app.use('/api', apiRouter);
};