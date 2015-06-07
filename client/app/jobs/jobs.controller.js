'use strict';

angular.module('theSignUp2App')
  .controller('JobsCtrl', function ($scope, $http, $cookieStore, User, Auth, Profile, JobsFactory) {
    $scope.filters = {};
    $scope.errors = {};
    $scope.jobs = []
    $scope.categories = ['Transportation', 'Food', 'Arts & Leisure']

    $scope.currentUser = Auth.getCurrentUser();
    $scope.job = {byUserId: $scope.currentUser._id};
    $scope.createJobPressed = false;
    $scope.jobPosted = false;

    JobsFactory.getJobs()
              .then(function(data){
                $scope.jobs = data
              })
              .catch(function(err){
                $scope.errors.other = err.message;
              })

    $scope.showCreateJobs = function(){
      if (!$scope.createJobPressed){
        $scope.createJobPressed = true
      } else {
        $scope.createJobPressed = false
      }
      $scope.job.name = 'THISI IS A TEST JOB'
      $scope.job.category = 'HORSES'
      $scope.job.info = 'ohwo'
      $scope.job.location = 'myplace'
      $scope.job.description = 'gonna make a taco'
      $scope.job.price = 1
    }
    $scope.createJob = function() {
      console.log('profile.controller.js: createJob', $scope.job)
      $scope.jobs.push($scope.job)
      $scope.job = {}
      Profile.createJob($scope.job)
        .then( function(data) {
          $scope.jobPosted = data;
          $scope.createJobPressed = false;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        }); 
    }

  });