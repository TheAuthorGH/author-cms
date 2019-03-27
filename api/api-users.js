const UserModel = require('../models/model-users');

const jsonParser = require('body-parser').json();

const router = require('express').Router();

router.post('/', [jsonParser], async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(400).send('Missing required fields.');
  }
  if(await UserModel.findOne({email})) {
    res.status(400).send('Email is already in use.');
    return;
  }
  try {
    const user = await UserModel.addUser({email, password});
    res.status(201).json(user.serialize());
  } catch(err) {
    res.status(500).end();
    return;
  }
});

router.get('/', async (req, res) => {
  res.status(501).end();
});

module.exports = router;