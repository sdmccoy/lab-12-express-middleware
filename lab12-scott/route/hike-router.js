'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Hike = require('../model/hike.js');


let hikeRouter = module.exports = new Router();

hikeRouter.post('/api/hike', jsonParser,  (req, res, next) => {
  console.log('Hit POST router');
  new Hike(req.body)
  .save()
  .then(newHike => res.json(newHike))
  .catch(next);
});

hikeRouter.get('/api/hike/:id', (req, res, next) => {
  console.log('Hit the GET route');
  console.log('req params id: ', req.params.id);
  Hike.findById(req.params.id)
  .then(hike => res.json(hike))
  .catch(next);
});
