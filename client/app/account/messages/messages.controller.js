'use strict';

angular.module('theSignUp2App')
  .controller('MessagesCtrl', function ($scope, GrabStuff, User, Auth) {
    $scope.errors = {};
    $scope.messages = [];
	GrabStuff.getMessages()
    				.then(function(data){
    					$scope.messages = data
    				})
    				.catch(function(err){
    					$scope.errors.other = err.message;
    				})
    console.log($scope.messages)
    // TODO
	});