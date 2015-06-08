'use strict';

angular.module('theSignUp2App')
  .controller('FriendFinderCtrl', function ($scope, $window, $http, $cookieStore, User, Auth, Profile, Upload, $state) {
    $scope.errors = {};
    $scope.users = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.allUsers = [];
  });
