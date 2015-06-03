'use strict';

angular.module('theSignUp2App')
  .controller('MessagesCtrl', function ($scope, User, Auth, Message) {
    $scope.errors = {};
    $scope.message = [];
    $scope.submit = function() {
        console.log("YES!")
    };
    //     fromUserID:,
    //     toUserID:,
    //     title:  'Hello BOB',
    //     author: 'userIDhere',
    //     body:   'this is the message',
    //     comments: [{ body: 'this is a comment', date: Date() }],
    //     date: { type: Date, default: Date.now() },
    //     hidden: false
    //   };
	Message.getMessages()
    				.then(function(data){
    					$scope.messages = data
                        console.log('getData', data)
    				})
    				.catch(function(err){
    					$scope.errors.other = err.message;
    				})
    Message.sendMessages()
                    .then(function(data){
                        console.log("Success")
                        console.log('send data', data)
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
	});