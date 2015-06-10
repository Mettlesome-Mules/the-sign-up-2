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
  var areaLat      = 30.2500,
      areaLng      = 97.7500,
      areaZoom     = 14;

      //promise that runs after gMaps is fully loaded
  uiGmapGoogleMapApi.then(function(maps) {
  	
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };

    //geolocating function
   var onSuccess = function(position) {
    $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    $scope.$apply();
}

function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

$scope.myMarkers = [];

$scope.addMarker = function($event, $params) {
  $scope.myMarkers.push(new google.maps.Marker({
    map: $scope.myMap,
    position: $params[0].latLng
  }));
};

$scope.openMarkerInfo = function(marker) {
  $scope.currentMarker = marker;
  $scope.currentMarkerLat = marker.getPosition().lat();
  $scope.currentMarkerLng = marker.getPosition().lng();
  $scope.myInfoWindow.open($scope.myMap, marker);
};

$scope.setMarkerPosition = function(marker, lat, lng) {
  marker.setPosition(new google.maps.LatLng(lat, lng));
};

$scope.setZoomMessage = function(zoom) {
  $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
  console.log(zoom,'zoomed')
};





  });
});