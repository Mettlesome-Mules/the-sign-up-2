/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /jobs              ->  index
 * POST    /jobs              ->  create
 * GET     /jobs/:id          ->  show
 * PUT     /jobs/:id          ->  update
 * DELETE  /jobs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Job = require('./job.model');

// get myjobs
exports.getmyjobs = function(req, res) {
  console.log('job.controller.js: getmyjobs: req.params', req.params)
  console.log('job.controller.js: getmyjobs: req.body', req.body)
  Job.find({byUserId: req.params.id}, function (err, jobs) {
    if(err) { return handleError(res, err); }
    console.log('job.controller.js: getmyjobs: Job.find(...)', jobs)
    if(!jobs) { return res.send(404); }
    return res.json(200,jobs);
  });
};

// Get list of jobs
exports.index = function(req, res) {
  Job.find(function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.json(200, jobs);
  });
};

// Get a single job
exports.show = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    return res.json(job);
  });
};

// Creates a new job in the DB.
exports.create = function(req, res) {
  console.log('job.controller.js: create: req.body',req.body)
  console.log(req.params)
  Job.create(req.body, function(err, job) {
    if(err) { return handleError(res, err); }
    return res.json(201, job);
  });
};


// Save a job to the database
exports.createJob = function(req, res) {
  console.log('job.controller.js: create: req.body',req.body)
  console.log(req.params)
  Job.create(req.body, function(err, job) {
    if(err) { return handleError(res, err); }
    console.log('job.controller.js: Job posted successfully')
    return res.json(201, job);
  });
};

// Updates an existing job in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Job.findById(req.params.id, function (err, job) {
    if (err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    var updated = _.merge(job, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, job);
    });
  });
};

// Deletes a job from the DB.
exports.destroy = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    job.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}