'use strict';


angular.module('theSignUp2App')
  .controller('mapsController', function ($scope, $log, $timeout) {
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 12 };
    $scope.geocoder = new google.maps.Geocoder();
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.message = 'Its working!!!!';
    $scope.geocoder;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
	$scope.codeAddress = function() {
	  var address = document.getElementById('address').value;
	  $scope.geocoder.geocode( { 'address': address}, function(results, status) {
	
	    if (status == google.maps.GeocoderStatus.OK) {
	    	console.log(results[0].geometry.location)
	      var marker = new google.maps.Marker({
	          map: map,
	          position: results[0].geometry.location
	      });
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}










	    //geolocating function
	   var onSuccess = function(position) {
	    $scope.map.center = {
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude
	    };
	    $scope.$apply();
	    console.log('centering')
	}
	function onError(error) {
	    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

  });