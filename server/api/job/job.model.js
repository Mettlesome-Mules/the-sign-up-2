'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
  byUserId: String,
  name: String,
  // category: String,
  // info: String,
  // location: String,
  // description: String,
  // price: Number,
  // active: Boolean
});

module.exports = mongoose.model('Job', JobSchema);