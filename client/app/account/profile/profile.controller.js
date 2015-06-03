'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $http, $cookieStore, User, Auth, Profile) {
      $scope.errors = {};
      $scope.users = {};
      $scope.isPressed = false;
      $scope.currentUser = Auth.getCurrentUser();
      $scope.currentUser.profileInfo.about = $scope.currentUser.profileInfo.about || 'About me';
      $scope.updateSuccess = '';
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

      $scope.updateProfileInfo = function(){
        GrabStuff.updateProfileInfo($scope.currentUser.profileInfo)
          .then( function(data) {
            $scope.updateSuccess = data;
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });        
      };

  });
