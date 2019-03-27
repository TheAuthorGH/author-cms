const router = require('express').Router();

const jsonParser = require('body-parser').json();

const {localAuth} = require('./auth');

router.post('/', [jsonParser, localAuth], (req, res) => {
  res.json(req.user.createJwt());
});

module.exports = router;