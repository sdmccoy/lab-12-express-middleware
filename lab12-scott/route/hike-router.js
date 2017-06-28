'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Hike = require('../model/hike.js');


const hikeRouter = module.exports = new Router();

hikeRouter.post('/api/hike', jsonParser,  (req, res, next) => {
  console.log('Hit POST router');
  new Hike(req.body)
  .save()
  .then(newHike => res.json(newHike))
  .catch(next);
});
