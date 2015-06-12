'use strict';


angular.module('theSignUp2App')
  .controller('mapsController', function ($scope, $log, $timeout, JobsFactory) {
    $scope.map = {center: {latitude: 30.2500, longitude: 97.7500}, zoom: 12 };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.message = 'Its working!!!!';
    $scope.geocoder;
    $scope.jobsList;
    $scope.marker = {
      id: 0
      }
      
    //function for taking 
	$scope.codeAddress = function() {
	  var address = document.getElementById('address').value;
	  $scope.geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	    	console.log(results[0].geometry.location);
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






	$scope.markerJobs = function(){
		JobsFactory.getJobs()
              .then(function(data){
              	data.forEach(function(job){
              	job.coords = {
              		latitude: job.latitude,
              		longitude: job.longitude
              	}
              })
                $scope.jobsList = data;
                console.log($scope.jobsList)
			})
	}

	$scope.markerJobs();


	var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });




  });