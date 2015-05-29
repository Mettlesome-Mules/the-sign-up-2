'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  category: String,
  info: String,
  location: String,
  description: String,
  price: Number,
  active: Boolean
});

module.exports = mongoose.model('Service', ThingSchema);