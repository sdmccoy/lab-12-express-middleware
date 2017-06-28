'use strict';

module.exports = (err, req, res, next) => {
  //log just the error message that mongoose is returning
  console.error(err.message);
  //for entering in bad content
  if (err.message.toLowerCase().includes('validation failed')) return res.sendStatus(400);
  //for entering in a non unique value
  if (err.message.toLowerCase().includes('duplicate key')) return res.sendStatus(409);
  //if no id is found
  if (err.message.toLowerCase().includes('objectid failed')) return res.sendStatus(404);
  //else send back a 500 which is server error
  res.sendStatus(500);
};
