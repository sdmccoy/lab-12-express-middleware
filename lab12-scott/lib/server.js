'use strict';

const express = require('express');
const app = express();

// const mongoose = mongoose.connect(MONGODB_URI);

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
    }
    reject();
  });
};
