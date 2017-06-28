'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const API_URL = process.env.API_URL;
//bring in hike to remove the newly created hike after each test
const Hike = require('../model/hike.js');
//bring in server to start and stop it.
const server = require('../lib/server.js');

let tempHike;

describe('START OF TESTING FOR /api/hike\n', () => {
  //start and stop server after each
  before(server.start);
  after(server.stop);

  describe('Testing POST request\n', () => {
    //clear the db after each test
    after(() => Hike.remove({}));
    let data = {
      name: 'pacific crest trail',
      rating: 7,
      lat: 1233.211,
      lon: 32.5564,
    };
    describe('if successful\n', () => {
      it('it should return with a new hike', () => {
        return superagent.post(`${API_URL}/api/hike`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('pacific crest trail');
          expect(res.body.rating).toEqual(7);
          expect(res.body.lat).toEqual(1233.211);
          expect(res.body.lon).toEqual(32.5564);
        });
      });
    });
    describe('if passing in invalid body\n', () => {
      it('it should return a 400 status', () => {
        return superagent.post(`${API_URL}/api/hike`)
        .send()
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    describe('if passing in conflicting unique value {name}\n', () => {
      it('it should return a 409 status', () => {
        return superagent.post(`${API_URL}/api/hike`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
      });
    });

  });
});
