'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $http, $cookieStore, User, Auth, Profile) {
    $scope.errors = {};
    $scope.users = {};
    $scope.isPressed = false;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.job = {byUserId: $scope.currentUser._id};
    $scope.currentUser.profileInfo.about = $scope.currentUser.profileInfo.about || 'About me';
    $scope.updateSuccess = '';
    $scope.createJobPressed = false;
    $scope.jobPosted = false;
    $scope.myJobs = {};

    $scope.showUserInfo = function(){
      if (!$scope.isPressed){
        $scope.isPressed = true
      } else {
        $scope.isPressed = false
      }
      // console.log($scope.currentUser)
      // console.log($scope.isPressed)
    };
    $scope.showJobsCreated = function(){
      Profile.getMyJobs()
        .then( function(data) {
          console.log('myJobs: ', data)
          $scope.myJobs = data;
        })
        .catch( function(err) {
          console.log('myJobs Error:', err)
          $scope.errors.other = err.message;
        });
    }
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
      Profile.createJob($scope.job)
        .then( function(data) {
          $scope.jobPosted = data;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        }); 
    }

    $scope.updateProfileInfo = function(){
      Profile.updateProfileInfo($scope.currentUser.profileInfo)
        .then( function(data) {
          $scope.updateSuccess = data;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });        
    };

    console.log($scope.currentUser)
  });
