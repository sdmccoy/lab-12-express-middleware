'use strict';

const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  rating: {type: Number},
  lat: {type: Number, required: true, min: 10},
  lon: {type: Number, required: true, max: 999},
});

module.exports = mongoose.model('hike', hikeSchema);
