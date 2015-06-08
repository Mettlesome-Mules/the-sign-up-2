'use strict';

angular.module('theSignUp2App')
  .controller('JobsCtrl', function ($scope, $http, $cookieStore, User, Auth, Profile, JobsFactory, Message) {
    $scope.filters = {};
    $scope.errors = {};
    $scope.jobs = []
    $scope.categories = ['Transportation', 'Food', 'Arts & Leisure']
    $scope.friends = {};

    $scope.usermsg = {};
    $scope.friends = [];
    $scope.currentUser = Auth.getCurrentUser();

    $scope.currentUser = Auth.getCurrentUser();
    $scope.job = {byUserId: $scope.currentUser._id};
    $scope.createJobPressed = false;
    $scope.jobPosted = false;

    $scope.submit = function() {
        $scope.usermsg.fromUserId = $scope.currentUser._id;
        $scope.usermsg.title = '';
        Message.sendMessages($scope.usermsg)
                    .then(function(data){
                        console.log("Success")
                        console.log('send data', data)
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
        console.log("YES!")
    };

    JobsFactory.getJobs()
              .then(function(data){
                $scope.jobs = data
                $scope.jobFriends = []

                $scope.jobs.forEach(function(j) {
                  $scope.jobFriends.push(j.byUserId)
                })
                Message.getFriends($scope.jobFriends)
                  .then(function(data){
                      for (var i = 0; i < data.length; i++) {
                        $scope.friends[data[i]._id] = data[i].name
                      };
                      console.log($scope.friends)
                  })
                  .catch(function(err){
                      $scope.errors.other = err.message;
                  })
      
              })
              .catch(function(err){
                $scope.errors.other = err.message;
              })


    $scope.createJob = function() {
      console.log('profile.controller.js: createJob', $scope.job)
      $scope.jobs.push($scope.job)
      Profile.createJob($scope.job)
        .then( function(data) {
          $scope.jobPosted = data;
          $scope.createJobPressed = false;
          $scope.job = {}
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        }); 
    }




  });