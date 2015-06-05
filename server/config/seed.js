/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Service = require('../api/service/service.model')
var Message = require('../api/message/message.model')


var setupMessages = function(){
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
              Message.create(
                {
                  title:  'Hello'+user2[0].name,
                  fromUserId: user1[0]._id,
                  toUserId: user2[0]._id,
                  body:   'How are you doing today Test2 User from Test User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }, {
                  title:  'Hello'+user2[0].name,
                  fromUserId: user1[0]._id,
                  toUserId: user2[0]._id,
                  body:   'How are you doing today Test2 User from Test User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }, {
                  title:  'Hello'+user1[0].name,
                  fromUserId: user2[0]._id,
                  toUserId: user1[0]._id,
                  body:   'Test User!? WHYYY!? Sincerly Test2 User',
                  comments: [{ body: 'this is a comment', date: Date() }],
                  date: { type: Date, default: Date.now() },
                  hidden: false
                }, 
                function(err)
                {
                  if(err){console.log(err)}
                  console.log('users found')
                  Message.find({ title: 'HelloTest2 User' }, function(err, msg1)
                  {
                    if (err){console.log(err)}
                    Message.find({ body: 'Test User!? WHYYY!? Sincerly Test2 User' }, function(err, msg2)
                    {
                      if ( msg1[0] && msg2[0] )
                      {
                        user1[0].lastMessages = [{
                          fromPicUrl: user2[0].profileInfo.profilePicUrl, 
                          msgBody: msg2.body,
                          timestamp: msg2.date,
                          fromUserName: user2.name,
                          fromUserId: msg2.fromUserId
                        }] 
                        user2.lastMessages = [{
                          fromPicUrl: user1[0].profileInfo.profilePicUrl, 
                          msgBody: msg1.body,
                          timestamp: msg1.date,
                          fromUserName: user1.name,
                          fromUserId: msg1.fromUserId
                        }]  
                        user1[0].save()
                        user2[0].save()
                        console.log('messages populated')       
                      } 
                      else 
                      {
                        console.log(msg1, msg2)
                      }
                    })
                  })
                }
              )
            }
          })
        })
      }
    )
  })
}



Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },  {
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Service.find({}).remove(function() {
  Service.create({
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
    email: 'test@test.com',
    password: 'test',
    profileInfo: {profilePicUrl: './assets/images/grey_circle_user.png'}
  }, {
    provider: 'local',
    name: 'Test2 User',
    email: 'test2@test2.com',
    password: 'test2',
    profileInfo: {profilePicUrl: './assets/images/grey_circle_user.png'}
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'mettle',
    email: 'mettlesome.mules.dev@gmail.com',
    password: 'neigh123'
  }, function() {
      User.find({ 'name': 'Test User'}, function(err, user1){
        if (err){console.log(err)}
        User.find({ 'name': 'Test2 User'}, function(err, user2){
          user1[0].friends.push(user2[0]._id)
          user2[0].friends.push(user1[0]._id)
          user1[0].save(function (err) {
            if (err) { console.log(err) }
          })
          user2[0].save(function (err) {
            if (err) { console.log(err) }
          })
        })
      })
      console.log('finished populating users');
      setupMessages()
    }
  );
});


