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

  describe('Testing GET request\n', () => {
    //clear the db after each test
    after(() => Hike.remove({}));
    before(() => {
      return new Hike({
        name: 'pacific crest trail',
        rating: 7,
        lat: 1233.211,
        lon: 32.5564,
      })
      .save()
      .then(hike => tempHike = hike);
    });
    describe('if successful\n', () => {
      it('it should respond with a specific hike', () => {
        return superagent.get(`${API_URL}/api/hike/${tempHike._id}`)
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
    describe('if the id is not found\n', () => {
      it('it should return a 404 status', () => {
        return superagent.get(`${API_URL}/api/hike/3523`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });

  });
  describe('Testing PUT request\n', () => {
    //clear the db after each test
    after(() => Hike.remove({}));
    before(() => {
      return new Hike({
        name: 'pacific crest trail',
        rating: 7,
        lat: 1233.211,
        lon: 32.5564,
      })
      .save()
      .then(hike => tempHike = hike);
    });
    describe('if successful\n', () => {
      it('it should respond with a specific hike', () => {
        return superagent.put(`${API_URL}/api/hike/${tempHike._id}`)
        .send({rating: 10, lat: 234.32})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempHike.name);
          expect(res.body.rating).toEqual(10);
          expect(res.body.lat).toEqual(234.32);
          expect(res.body.lon).toEqual(tempHike.lon);
        });
      });
    });
    describe('if the id is not found\n', () => {
      it('it should return a 404 status', () => {
        return superagent.put(`${API_URL}/api/hike/3523`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
    describe('if the no or bad content is passed through\n', () => {
      it('it should return a 400 status', () => {
        return superagent.put(`${API_URL}/api/hike/${tempHike._id}`)
        .send('gibberish')
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });
  describe('Testing DELETE request\n', () => {
    //clear the db after each test
    after(() => Hike.remove({}));
    before(() => {
      return new Hike({
        name: 'pacific crest trail',
        rating: 7,
        lat: 1233.211,
        lon: 32.5564,
      })
      .save()
      .then(hike => tempHike = hike);
    });
    describe('if successful\n', () => {
      it('it should respond with a 204 and no content', () => {
        return superagent.delete(`${API_URL}/api/hike/${tempHike._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
          expect(res.body._id).toNotExist();
        });
      });
    });
    describe('if the id is not found\n', () => {
      it('it should return a 404 status', () => {
        return superagent.delete(`${API_URL}/api/hike/3523`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });
});
