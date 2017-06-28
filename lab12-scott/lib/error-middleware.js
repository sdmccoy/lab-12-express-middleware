'use strict';

module.exports = (err, req, res, next) => {
  //log just the error message that mongoose is returning
  console.error(err.message);
  //for entering in bad content
  if (err.message.toLowerCase().includes('validation failed')) return res.sendStatus(400);
  //for entering in a non unique value
  if (err.message.toLowerCase().includes('duplicate key')) return res.sendStatus(409);
  //else send back a 500 which is server error
  res.sendStatus(500);
};

//404 status is on the server.js to catch all of the bad url requests before hitting hike router
