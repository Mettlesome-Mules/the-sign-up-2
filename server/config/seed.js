/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Service = require('../api/service/service.model')
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
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});