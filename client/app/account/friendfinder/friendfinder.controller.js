'use strict';

angular.module('theSignUp2App')
  .controller('FriendFinderCtrl', function ($scope, $window, $http, $cookieStore, User, Auth, Profile, Upload, $state) {
    $scope.errors = {};
    $scope.users = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.allUsers = [];
     Profile.showAll()
        .then(function(data){
            data.forEach(function(friend, id){
                $scope.allUsers.push(friend)

            })
            //$scope.allUsers = data
        })
        .catch(function(err){
            $scope.errors.other = err.message;
        })
  });
