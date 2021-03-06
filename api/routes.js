const express = require('express');

const config = require('../config');

module.exports = (app) => {
  const apiRouter = express.Router();
  apiRouter.use('/users', require('./api-users'));
  apiRouter.use('/auth', require('./api-auth'));
  apiRouter.use('/stories', require('./api-stories'));
  apiRouter.use('/authors', require('./api-authors'));

  app.use(config.ROUTE_API, apiRouter);

  app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
      res.status(401).end();
    }
  });
};