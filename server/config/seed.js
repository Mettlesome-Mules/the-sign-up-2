/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Job = require('../api/job/job.model')
var Message = require('../api/message/message.model')

//*******************************//
// Called after users are created
//*******************************//
var setupMessages = function(){
  console.log('creating messages')
  Message.find({}).remove(function(){
    Message.create({
        title:  'Hello BOB',
        author: 'userIDhere',
        body:   'this is the message',
        comments: [{ body: 'this is a comment', date: Date() }],
        date: { type: Date, default: Date.now() },
        hidden: false 
      }, {
        title:  'Hello BOB',
        author: 'userIDhere',
        body:   'this is the message',
        comments: [{ body: 'this is a comment', date: Date() }],
        date: { type: Date, default: Date.now() },
        hidden: false
      },{
        title:  'Hello BOB',
        author: 'userIDhere',
        body:   'this is the message',
        comments: [{ body: 'this is a comment', date: Date() }],
        date: { type: Date, default: Date.now() },
        hidden: false
      },{
        title:  'Hello BOB',
        author: 'userIDhere',
        body:   'this is the message',
        comments: [{ body: 'this is a comment', date: Date() }],
        date: { type: Date, default: Date.now() },
        hidden: false
      }, 
      function() {
        User.find({ 'name': 'Test User'}, function(err, user1)
        {
          if (err){console.log(err)}
          User.find({ 'name': 'Test2 User'}, function(err, user2){
            if (user1[0] && user2[0])
            {
              console.log('creating chat history')
              Message.create(
                {
                  title:  'Hello'+user2[0].name,
                  fromUserId: user1[0]._id,
                  fromUserName: user1[0].name,
                  fromUserPicUrl: user1[0].profileInfo.profilePicUrl,
                  toUserId: user2[0]._id,
                  body:   'How are you doing today Test2 User from Test User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }, {
                  title:  'Hello'+user2[0].name,
                  fromUserId: user1[0]._id,
                  fromUserName: user1[0].name,
                  fromUserPicUrl: user1[0].profileInfo.profilePicUrl,
                  toUserId: user2[0]._id,
                  body:   'How are you doing today Test2 User from Test User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }, {
                  title:  'Hello'+user1[0].name,
                  fromUserId: user2[0]._id,
                  fromUserName: user2[0].name,
                  fromUserPicUrl: user2[0].profileInfo.profilePicUrl,
                  toUserId: user1[0]._id,
                  body:   'Test User!? WHYYY!? Sincerly Test2 User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }
              )
              setupJobs()
            }
          })
        })
      }
    )
  })
}

var addTestFriends = function() {
    User.find({ 'name': 'Test User'}, function(err, user1){
      if (err){console.log(err)}
      User.find({ 'name': 'Test2 User'}, function(err, user2){
        if (err){console.log(err)}
        User.find({ 'name': 'mettle'}, function(err, user3){

        user1[0].friends.push(user2[0]._id)
        user1[0].friends.push(user3[0]._id)
        user2[0].friends.push(user1[0]._id)
        user1[0].save(function (err) {
          if (err) { console.log(err) }
        })
        user2[0].save(function (err) {
          if (err) { console.log(err) }
        })
      })
    })
  })
  console.log('finished populating users');
  setupMessages()
}


//*******************************//
// Called after users and messages are created
//*******************************//
var setupJobs = function(){
  console.log('creating test jobs')
  Job.find({}).remove(function(){
    User.find({ 'name': 'Test User'}, function(err, user1){
      if (err){console.log(err)}
      User.find({ 'name': 'Test2 User'}, function(err, user2){
        if (user1[0] && user2[0]){
          Job.create({
            byUserId: user1[0]._id,
            name: 'Pegasus',
            category: 'Transportation',
            info: '9-5 and other info',
            location: 'Downtown',
            description: 'We give bike rides on bike pegs.',
            price: 99,
            active: true
          },  {
            byUserId: user1[0]._id,
            name: 'Uber For Horses',
            category: 'Transportation',
            info: '9-5 and other info',
            location: 'Downtown',
            description: 'Horse rides by horse peoplee. neigh.',
            price: 99,
            active: false
          },  {
            byUserId: user2[0]._id,
            name: 'Uber for Personal Chefs',
            category: 'Food',
            info: 'I make the curry',
            location: 'My kitchen',
            description: 'Vegetable curries on the rice.',
            price: 99,
            active: true
          },  {
            byUserId: user2[0]._id,
            name: 'Cage Fight',
            category: 'Arts & Leisure',
            info: '9-5 and other info',
            location: 'My House',
            description: 'Rage Cage ... Nicolas Cage and You. A seminar.',
            price: 99,
            active: true
          }, function(err) {
            if(err){console.log(err)}
            else{
              console.log('Jobs added')
              setupLastMessages()
            }
          })
        }
      });
    });
  })
}

var setupLastMessages = function(){
  console.log('creating lastMessages')
  User.find({ email: 'test@test.com' }, function(err, user1)
  {
    if (err){console.log(err)}
    User.find({ name: 'Test2 User' }, function(err, user2)
    {
      if(err){console.log(err)}
      if (!user1[0] || !user2[0]){
        console.log('seed.js: setupLastMessages: DID NOT FIND BOTH USERS')
        return
      }
      console.log('seed.js: setupLastMessages: Users found')
      Message.find({ fromUserId: user1[0]._id }, function(err, msg1)
      {
        if (err){console.log(err)}
        Message.find({ fromUserId: user2[0]._id }, function(err, msg2)
        {
          if ( msg1[0] && msg2[0]) {
            user1[0].lastMessages.push({
              fromPicUrl: user2[0].profileInfo.profilePicUrl, 
              msgBody: msg2[0].body,
              timestamp: msg2[0].date,
              fromUserName: user2[0].name,
              fromUserId: msg2[0].fromUserId
            })
            user2[0].lastMessages.push({
              fromPicUrl: user1[0].profileInfo.profilePicUrl, 
              msgBody: msg1[0].body,
              timestamp: msg1[0].date,
              fromUserName: user1[0].name,
              fromUserId: msg1[0].fromUserId
            })
            user1[0].save(function(err, suc){
              if(err){
                console.log('seed.js: setupLastMessages: Error on save.1',err, arguments)
              }
            })
            user2[0].save(function(err, suc){
              if(err){
                console.log('seed.js: setupLastMessages: Error on save.2',err, arguments)
              }
            })
            console.log('messages populated')       
          } 
          else 
          {
            console.log('MESSAGES NOT POPULATED',msg1, msg2)
          }
        })
      })
    })
  })
}


Job.find({}).remove(function() {
  Job.create({
    name: 'Pegasus',
    category: 'Transportation',
    info: '9-5 and other info',
    location: 'Downtown',
    description: 'We give bike rides on bike pegs.',
    price: 99,
    active: true
  },  {
    name: 'Uber For Horses',
    category: 'Transportation',
    info: '9-5 and other info',
    location: 'Downtown',
    description: 'Horse rides by horse peoplee. neigh.',
    price: 99,
    active: false
  },  {
    name: 'Uber for Personal Chefs',
    category: 'Food',
    info: 'I make the curry',
    location: 'My kitchen',
    description: 'Vegetable curries on the rice.',
    price: 99,
    active: true
  },  {
    name: 'Cage Fight',
    category: 'Arts & Leisure',
    info: '9-5 and other info',
    location: 'My House',
    description: 'Rage Cage ... Nicolas Cage and You. A seminar.',
    price: 99,
    active: true
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    lastMessages: [],
    email: 'test@test.com',
    password: 'test',
    profileInfo: {profilePicUrl: './assets/images/grey_circle_user.png'}
  }, {
    provider: 'local',
    lastMessages: [],
    name: 'Test2 User',
    email: 'test2@test2.com',
    password: 'test2',
    profileInfo: {profilePicUrl: './assets/images/grey_circle_user.png'}
  }, {
    provider: 'local',
    lastMessages: [],
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    lastMessages: [],
    role: 'admin',
    name: 'mettle',
    email: 'mettlesome.mules.dev@gmail.com',
    password: 'neigh123'
  }, function() {
      addTestFriends()
    }
  );
});


