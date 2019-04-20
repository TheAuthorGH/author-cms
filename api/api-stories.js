const StoryModel = require('../models/model-stories');

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;
const _ = require('lodash');
const jsonParser = require('body-parser').json();
const {requireAuth, optionalAuth} = require('./auth');

const router = require('express').Router();

router.get('/', [optionalAuth], async (req, res) => {
  const {query} = req;
  const page = Number(query.page) || 0;
  const pageSize = Number(query.page_size) || 10;

  const selector = {};
  if(!req.user) {
    selector.public = true;
  } else if(query.public) {
    selector.public = query.public !== 'false';
  }
  if(query.title) {
    selector.title = new RegExp(query.title, 'i');
  }
  if(query.author) {
    if(!ObjectId.isValid(query.author)) {
      res.status(400).send('Invalid ID.');
      return;
    }
    selector.author = query.author;
  }

  const storyCount = await StoryModel.countDocuments(selector);
  const stories = await StoryModel
    .find(selector)
    .skip(page * pageSize)
    .limit(pageSize)
    .populate('author');

  res.status(200).json({
    pages: Math.ceil(storyCount / pageSize),
    recordCount: storyCount,
    records: stories.map(story => story.serialize())
  });
});

router.get('/:slug', [optionalAuth, jsonParser], async (req, res) => {
  const story = await StoryModel.findOne({slug: req.params.slug}).populate('author');
  if(!story || (!story.public && !req.user)) {
    res.status(404).end();
    return;
  }
  res.status(200).json(story.serializeWithParts());
});

router.post('/', [requireAuth, jsonParser], async (req, res) => {
  let {slug, title} = req.body;
  if(!slug || !title) {
    res.status(400).send('Missing required fields.');
    return;
  }
  slug = _.kebabCase(slug);
  if(await StoryModel.findOne({slug})) {
    res.status(400).send('Slug is already in use');
    return;
  }
  try {
    const story = await StoryModel.create({slug, title});
    res.status(201).json(story.serialize());
  } catch(err) {
    res.status(500).end();
  }
});

router.put('/parts/:slug', [requireAuth, jsonParser], async (req, res) => {
  const story = await StoryModel.findOne({slug: req.params.slug});
  if(!story) {
    res.status(404).end();
    return;
  }
  story.parts = req.body;
  try {
    await story.save();
    res.status(204).end();
  } catch(err) {
    res.status(500).end();
  }
});

router.patch('/:slug', [requireAuth, jsonParser], async (req, res) => {
  const story = await StoryModel.findOne({slug: req.params.slug});
  if(!story) {
    res.status(404).end();
    return;
  }

  const updates = req.body;
  if('public' in updates) {
    story.public = updates.public;
  }
  if('title' in updates) {
    story.title = updates.title;
  }
  if('author' in updates) {
    if(!ObjectId.isValid(updates.author)) {
      res.status(400).send('Invalid ID.');
      return;
    }
    story.author = updates.author;
  }
  
  try {
    await story.save();
    res.status(204).end();
  } catch(err) {
    res.status(500).end();
  }
});

router.delete('/:slug', [requireAuth], async (req, res) => {
  await StoryModel.findOneAndDelete({slug: req.params.slug});
  res.status(204).end();
});

module.exports = router;