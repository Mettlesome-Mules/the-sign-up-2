'use strict';

angular.module('theSignUp2App')
	.config(function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	           key: 'AIzaSyBRJ0SRxiRrFdjX1M-Ot08teFZ24qUZf2o',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	})

 .controller("mapsController", function($scope, uiGmapGoogleMapApi) {
 	console.log('heelo!')
  // Define variables for our Map object
  var areaLat      = 44.2126995,
      areaLng      = -100.2471641,
      areaZoom     = 3;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });

});