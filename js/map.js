var infoWindow;

function initMap() {
	var marker; 

	/* Directions */
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

	/* Map */
	var mapCanvas = document.getElementById('map');
	var mapOptions = { center: new google.maps.LatLng(41.4585462,-74.069749),
		 			    zoom: 12,
		 				mapTypeId: google.maps.MapTypeId.ROADMAP
		 			}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	directionsDisplay.setMap(map); //set Directions to Map

	setMarkers(map);

	function attachInfo(marker, winContent) {

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(winContent);
			infoWindow.open(map,marker); 
		});

	}

	/* Directions */ 
	
	calculateAndDisplayRoute(directionsService, directionsDisplay);
}

/* Set Markers */ 

var addresses = [
	["Storm King", 41.4249306, -74.0615234, 1],
	["House 1", 41.469262, -74.1196583, 2],
	["Homewood Suites", 41.490406, -74.1003697, 3],
	["Ivy Rock Farms", 41.438291,-74.0860243, 4],
	["House 2", 41.476554,-74.0576357, 5]
];

function setMarkers(map) {
	var postOffice = new google.maps.LatLng(41.4649361, -74.0385725);
	var startMarker = new google.maps.Marker({icon: "img/post_office.png", map: map, position: postOffice});

	var blueMarker = {
          url: 'img/blue_marker2.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
    };

    var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
    };

	for (i=0; i<addresses.length; i++){
		var address = addresses[i];

		var marker = new google.maps.Marker({
            position: {lat: address[1], lng: address[2]},
            map: map,
            icon: blueMarker,
            shape: shape,
            title: address[0]
        });
	}

	var redMarker = {
		  url: 'img/red_marker2.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
	}


		var waypnts = new google.maps.Marker({
			position: new google.maps.LatLng(41.429306,-74.0615234),
			map: map,
			shape: shape,
			icon: redMarker,
			zIndex:100
		});

}


/* Direction Function */ 

function calculateAndDisplayRoute (directionsService, directionsDisplay) {

	var waypnts = [];

	waypnts.push({
		location: new google.maps.LatLng(41.429306,-74.0615234),
		stopover:true
	});

	waypnts.push({
		location: new google.maps.LatLng(41.438291,-74.0860243),
		stopover: true
	});

	directionsService.route({
		origin: {lat: 41.4649361, lng: -74.0385725},
		destination: {lat: 41.4649361, lng: -74.0385725},
		waypoints: waypnts,
		optimizeWaypoints: true,
		travelMode: "DRIVING"
	}, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      });
}