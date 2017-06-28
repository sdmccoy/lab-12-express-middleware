'use strict';

const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  rating: {type: Number, min: 1, max: 10},
  lat: {type: Number, required: true},
  lon: {type: Number, required: true},
});

module.exports = mongoose.model('hike', hikeSchema);
