const AuthorModel = require('../models/model-authors');

const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const {requireAuth} = require('./auth');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const {query} = req;
  const page = Number(query.page) || 0;
  const pageSize = Number(query.page_size) || 10;

  const selector = {};
  if(query.name) {
    selector.name = new RegExp(query.name, 'i');
  }

  const authorCount = await AuthorModel.countDocuments(selector);
  const authors = await AuthorModel
    .find(selector)
    .skip(page * pageSize)
    .limit(pageSize);

  res.status(200).json({
    pages: Math.ceil(authorCount / pageSize),
    recordCount: authorCount,
    records: authors.map(author => author.serialize())
  });
});

router.get('/:id', async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID.');
    return;
  }
  const author = await AuthorModel.findById(req.params.id);
  if(!author) {
    res.status(404).end();
    return;
  }
  res.status(200).json(author.serialize());
});

router.post('/', [requireAuth, jsonParser], async (req, res) => {
  const {name} = req.body;
  if(!name) {
    res.status(400).send('Missing required fields.');
  }
  try {
    const author = await AuthorModel.create({name});
    res.status(201).json(author.serialize());
  } catch(err) {
    res.status(500).end();
  }
});

router.patch('/:id', [requireAuth, jsonParser], async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID.');
    return;
  }
  const author = await AuthorModel.findById(req.params.id);
  if(!author) {
    res.status(404).end();
    return;
  }

  const updates = req.body;
  if('name' in updates) {
    author.name = updates.name;
  }
  
  try {
    await author.save();
    res.status(201).end();
  } catch(err) {
    res.status(500).end();
  }
});

router.delete('/:id', [requireAuth], async (req, res) => {
  await AuthorModel.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;