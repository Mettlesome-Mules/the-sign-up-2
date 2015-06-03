'use strict';

angular.module('theSignUp2App')
  .factory('Job', function ($resource) {
    return $resource('/api/jobs/:id/:controller', {
      id: '@_id'
    },
    {
      getJobs: {
        method: 'GET',
        params: {
          controller:'index'
        }
      }
    });
  });
