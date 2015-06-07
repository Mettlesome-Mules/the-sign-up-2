'use strict';

angular.module('theSignUp2App')
  .controller('MessagesCtrl', function ($scope, User, Auth, Message) {
    $scope.errors = {};
    $scope.message = [];
    $scope.usermsg = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.messages = [];
    $scope.submit = function() {
        $scope.usermsg.fromUserID = $scope.currentUser._id;
        $scope.usermsg.toUserID = 'TODO: toUserID';
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
    //     fromUserID:,
    //     toUserID:,
    //     title:  'Hello BOB',
    //     author: 'userIDhere',
    //     body:   'this is the message',
    //     comments: [{ body: 'this is a comment', date: Date() }],
    //     date: { type: Date, default: Date.now() },
    //     hidden: false
    //   };
	// Message.getMessages()
 //    				.then(function(data){
 //    					$scope.messages = data
 //                        console.log('getData', data)
 //    				})
 //    				.catch(function(err){
 //    					$scope.errors.other = err.message;
 //    				})
 //    console.log($scope.currentUser.lastMessages)
 //    console.log('friends',$scope.currentUser.friends)

    Message.lastMessages($scope.currentUser.friends, $scope.currentUser._id)
                    .then(function(data){
                        $scope.messages = data
                    })
                    .catch(function(err){
                        $scope.errors.other = err.message;
                    })
                    console.log('messages.controlller.js: lastMessages: ',$scope.messages)

    
	});