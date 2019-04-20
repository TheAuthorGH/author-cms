const express = require('express');

module.exports = (app) => {
  const apiRouter = express.Router();
  apiRouter.use('/users', require('./api-users'));
  apiRouter.use('/auth', require('./api-auth'));
  apiRouter.use('/stories', require('./api-stories'));
  apiRouter.use('/authors', require('./api-authors'));

  app.use('/api', apiRouter);

  app.use(require('connect-history-api-fallback')());
  app.use(express.static('public'));

  app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
      res.status(401).end();
    }
  });
};