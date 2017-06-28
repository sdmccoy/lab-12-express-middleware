'use strict';

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

//allow our server to recognize all of our routes
app.use(require('../route/hike-router.js'));
//allow the server to respond with the error middleware message
app.use(require('./error-middleware.js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

let server;

//start server on off controller and make it importable
const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if (!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up on', process.env.PORT);
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        server.isOn = false;
        console.log('server', process.env.PORT, 'shut down');
        resolve();
      });
      return;
    }
    reject();
  });
};
