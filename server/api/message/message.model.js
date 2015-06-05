
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title:  String,
  author: String,
  fromUserId: String,//Schema.Types.ObjectId,
  toUserId: String,//Schema.Types.ObjectId,
  body:   String,
  lastMessage: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
