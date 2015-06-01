'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $http, $cookieStore, User, Auth, GrabStuff) {
      $scope.errors = {};
      $scope.users = {};
      $scope.isPressed = false;
      $scope.currentUser = Auth.getCurrentUser();
      $scope.currentUser.profileInfo.about = $scope.currentUser.profileInfo.about || 'About me';
      $scope.updateSuccess = '';
      $scope.showPassword = function(e){
        if (!$scope.isPressed){
          $scope.isPressed = true
        } else {
          $scope.isPressed = false
        }
        console.log($scope.currentUser)
        console.log($scope.isPressed)
      };

      $scope.updateProfileInfo = function(e){
        if (!$scope.isMessagePressed){
          $scope.isMessagePressed = true
        } else {
          $scope.isMessagePressed = false
        }
        GrabStuff.updateProfileInfo($scope.currentUser.profileInfo)
          .then( function(data) {
            $scope.updateSuccess = data;
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });        
      };

  });
