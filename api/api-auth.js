
const jsonParser = require('body-parser').json();
const {localAuth, requireAuth} = require('./auth');
const UserModel = require('../models/model-users');

const router = require('express').Router();

router.post('/', [jsonParser, localAuth], (req, res) => {
  res.json(req.user.createJwt());
});

router.post('/refresh', [requireAuth], async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  if(user) {
    res.json(user.createJwt());
  } else {
    res.status(401).end();
  }
});

module.exports = router;