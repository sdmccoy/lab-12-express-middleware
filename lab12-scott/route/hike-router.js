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

hikeRouter.put('/api/hike/:id', jsonParser, (req, res, next) => {
  console.log('Hit the PUT route');
  let options = {
    runValidators: true,
    new: true,
  };
  Hike.findByIdAndUpdate(req.params.id, req.body, options)
  .then(updatedHike => res.json(updatedHike))
  .catch(next);
});

hikeRouter.delete('/api/hike/:id', (req, res, next) => {
  console.log('Hit the DELETE route');
  Hike.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
