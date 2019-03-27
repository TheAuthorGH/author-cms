const Users = require('../models/model-users');

const router = require('express').Router();

router.post('/', async (req, res) => {
  res.status(501).end();
});

router.get('/', async (req, res) => {
  res.status(501).end();
});

module.exports = router;