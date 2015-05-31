'use strict';

angular.module('theSignUp2App')
  // ********************************//
  // $resource is a high level $http
  // it handles $http.get and $http.post
  // but its more configurable
  // ********************************//
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
