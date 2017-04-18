var map;
var bounds;
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

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latLong = new google.maps.LatLng(lat, lng);
        bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            center: latLong,
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var devicetype = device.platform;
        var icon = {
            url: "img/blackcar.png", // url
            scaledSize: new google.maps.Size(30, 35), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var position = new google.maps.LatLng(lat, lng);
            bounds.extend(position);
            marker = new google.maps.Marker({
              position: position,
              icon: icon,
              map: map,
            });

var infowindow = new google.maps.InfoWindow();

            codeLatLng(lat,lng,map,marker,infowindow);
            map.setZoom(12);
            setInterval(function()
            {
              navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
            },10000)
    },

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};
app.initialize();

function codeLatLng(lat, lng,map,marker,infowindow) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var address = results[0].formatted_address;
        var contentString = '<div id="content">'+address+'</div';

        // marker.addListener('click', function() {
        //     infowindow.setContent(contentString);
        //     infowindow.open(map, marker);
        // });

      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
function resetMap() {
  app.initialize();

}

function getFontSize() {
  var devicetype = device.platform;
  if (devicetype == 'iOS') {
    return 'small';
  } else {
    return 'x-large';
  }
}
