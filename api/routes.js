const express = require('express');

module.exports = (app) => {
  app.use(express.static('public'));

  const apiRouter = express.Router();
  apiRouter.use('/users', require('./api-users'));
  apiRouter.use('/auth', require('./api-auth'));
  apiRouter.use('/stories', require('./api-stories'));

  app.use('/api', apiRouter);

  app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
      res.status(401).end();
    }
  });
};