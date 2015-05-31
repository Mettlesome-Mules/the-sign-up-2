'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $http, $cookieStore, User, Auth) {
      $scope.errors = {};
      $scope.users = {};
      $scope.isPressed = false;
      $scope.currentUser = Auth.getCurrentUser();
      $scope.showPassword = function(e){
        if (!$scope.isPressed){
          $scope.isPressed = true
        } else {
          $scope.isPressed = false
        }
        console.log($scope.currentUser)
        console.log($scope.isPressed)
      };

      $scope.getCurrentUser = function(){

      };
  });
