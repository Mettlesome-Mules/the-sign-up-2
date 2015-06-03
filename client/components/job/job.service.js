'use strict';

angular.module('theSignUp2App')
  .factory('Job', function ($resource) {
    return $resource('/api/jobs/:id/:controller', {
      id: '@_id'
    },
    {
      getMyJobs: {
        method: 'GET',
        isArray:true,
        params: {
          controller:'getmyjobs'
        }
      }
    });
  });
