'use strict';

angular.module('theSignUp2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      // **************************************//
      // Not sure if this is the right place to put these 
      // services should be available to anyone logged in or not
      // messages should only be available to those the user
      // **************************************//
      // TODO
      // .state('profile', {
      //   url: '/profile',
      //   templateUrl: 'app/account/profile/profile.html',
      //   controller: 'ProfileCtrl',
      //   authenticate: true
      // })
      // TODO: 
      // .state('services', {
      //   url: '/services', 
      //   templateUrl: 'app/account/servics/services.html',
      //   controller: 'ServicesCtrl',
      //   authenticate: true,
      // });
      // TODO: 
      .state('messages', {
        url: '/messages', 
        templateUrl: 'app/account/messages/messages.html',
        controller: 'MessagesCtrl',
        authenticate: true,
      });
  });