'use strict';

angular.module('theSignUp2App')
  .controller('ProfileCtrl', function ($scope, $http, $cookieStore, User, Auth, GrabStuff) {
      $scope.errors = {};
      $scope.users = {};
      $scope.isPressed = false;
      $scope.isMessagePressed = false;
      $scope.isServicesPressed = false;
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

      $scope.showMessages = function(e){
        if (!$scope.isMessagePressed){
          $scope.isMessagePressed = true
        } else {
          $scope.isMessagePressed = false
        }
        console.log($scope.isMessagePressed)
      };

      $scope.showServices = function(e){
        if (!$scope.isServicesPressed){
          $scope.isServicesPressed = true
        } else {
          $scope.isServicesPressed = false
        }
        console.log($scope.isServicesPressed)
      };
  });
