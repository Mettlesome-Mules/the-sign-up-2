'use strict';

angular.module('theSignUp2App')
  .controller('JobsCtrl', function ($scope, $http, $cookieStore, User, Auth, Profile, JobsFactory) {
    $scope.filters = {};
    $scope.errors = {};
    $scope.jobs = []
    $scope.categories = ['Transportation', 'Food', 'Arts & Leisure']
    
    JobsFactory.getJobs()
              .then(function(data){
                $scope.jobs = data
              })
              .catch(function(err){
                $scope.errors.other = err.message;
              })
  });
