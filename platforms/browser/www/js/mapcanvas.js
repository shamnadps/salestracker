var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');

       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){
      initMap();
    },

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};

app.initialize();

function initMap() {
  setFontSizeToLarge();
  var devicetype = device.platform;
  var icon = {
      url: "img/blackcar.png", // url
      scaledSize: new google.maps.Size(25, 30), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
if (devicetype == 'Android') {
  icon = {
      url: "img/blackcar.png", // url
      scaledSize: new google.maps.Size(50, 60), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
}
    var pointA = new google.maps.LatLng(21.478503, 40.566196),
        pointB = new google.maps.LatLng(20.037963, 41.491884),
        myOptions = {
            zoom: 7,
            center: pointA
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        }),



        marker = new google.maps.Marker({
          position: new google.maps.LatLng(21.078503, 40.966196),
          icon: icon,
          map: map
        });

        markerA = new google.maps.Marker({
            position: pointA,
            title: "point A",
            label: "A",
            map: map
        }),
        markerB = new google.maps.Marker({
            position: pointB,
            title: "point B",
            label: "B",
            map: map
        });

    // get route from A to B
    calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB,marker,map);


}

var i = 0;                //  set your counter to 1
function moveMarker (map, marker, myRoute) {
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      marker.setPosition( myRoute.overview_path[i]);            //  your code here
      i++;                     //  increment the counter
      if (i < myRoute.overview_path.length) {            //  if the counter < 10, call the loop function
         moveMarker(map, marker,myRoute);             //  ..  again which will trigger another
      } else {

      }                        //  ..  setTimeout()
   }, 1000)
}

function moveMarkerBack (map, marker, myRoute) {
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      marker.setPosition( myRoute.overview_path[i]);            //  your code here
      i--;                     //  increment the counter
      if (i ) {            //  if the counter < 10, call the loop function
         moveMarker(map, marker,myRoute);             //  ..  again which will trigger another
      } else {

      }                        //  ..  setTimeout()
   }, 1000)
}

var myRoute;
function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB,marker,map) {

    directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            myRoute = response.routes[0];
            marker.setMap( map );
            moveMarker( map, marker , myRoute);
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function setFontSizeToLarge() {
  var devicetype = device.platform;
  if (devicetype == 'Android') {
    document.getElementById("body").style.fontSize = "large";
    document.getElementById("changeroute").style.fontSize = "large";
    document.getElementById("calldriver").style.fontSize = "large";
    document.getElementById("buttonStyle").style.fontSize = "large";
  }
}
