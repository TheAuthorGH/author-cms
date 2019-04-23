const UserModel = require('../models/model-users');

const jsonParser = require('body-parser').json();
const {requireAuth} = require('./auth');

const router = require('express').Router();

router.post('/', [requireAuth, jsonParser], async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    res.status(400).send('Missing required fields.');
  }
  if(await UserModel.findOne({username})) {
    res.status(400).send('Username is already in use.');
    return;
  }
  try {
    const user = await UserModel.addUser({username, password});
    res.status(201).json(user.serialize());
  } catch(err) {
    res.status(500).end();
  }
});

module.exports = router;