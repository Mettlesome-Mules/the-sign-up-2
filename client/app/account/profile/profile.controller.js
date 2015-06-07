'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $window, $http, $cookieStore, User, Auth, Profile, Upload) {
    $scope.errors = {};
    $scope.users = {};

    $scope.isPressed = false;
    $scope.currentUser.profileInfo.about = $scope.currentUser.profileInfo.about || 'About me';
    $scope.updateSuccess = '';
    $scope.file = '';
    $scope.myJobs = {};

    $scope.currentUser = Auth.getCurrentUser();
    $scope.job = {byUserId: $scope.currentUser._id};
    $scope.createJobPressed = false;
    $scope.jobPosted = false;

    $scope.showUserInfo = function(){
      if (!$scope.isPressed){
        $scope.isPressed = true
      } else {
        $scope.isPressed = false
      }
      // console.log($scope.currentUser)
      // console.log($scope.isPressed)
    };

    $scope.profilePicUpload = function(files){
      console.log('profilePicUpload', arguments)
      if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log(file)
              Upload.upload({
                  url: 'api/users/profilepic',
                  fields: {'userId': $scope.currentUser._id},
                  file: file
              }).progress(function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
              }).success(function (data, status, headers, config) {
                  console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                  $window.location.reload();
              });
          }
      }
    }
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
