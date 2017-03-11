var map;
var bounds;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        setFontSizeToLarge();
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
       setFontSizeToLarge();
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){

        var longitude = '39.172777999999994';
        var latitude = '21.543333';
        var latLong = new google.maps.LatLng(latitude, longitude);
        bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var devicetype = device.platform;
        var icon = {
            url: "img/blackcar.png", // url
            scaledSize: new google.maps.Size(30, 35), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        if (devicetype == 'Android') {
          icon = {
              url: "img/blackcar.png", // url
              scaledSize: new google.maps.Size(50, 60), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 60),
              labelOrigin: new google.maps.Point(10, 58)
          };
        }



  var locations = [
      ['<div style="font-size:'+getFontSize()+';color:black;">Driver No: ST01<br>Location:Taif<br>EST Trip completion: N/A<br><a href="mapcanvas.html">View Driver Route</a></div>', 21.478503, 40.566196, '1', 'ST_01'],
      ['<div style="font-size:'+getFontSize()+';color:black;">Driver No: ST02<br>Location:Al Wazeeriah, Jeddah<br>EST Trip completion: N/A<br><a href="mapcanvas.html">View Driver Route</a></div>', 21.444598, 39.248555, '2', 'ST_02'],
      ['<div style="font-size:'+getFontSize()+';color:black;">Driver No: ST03<br>Location:Medina<br>EST Trip completion: N/A<br><a href="mapcanvas.html">View Driver Route</a></div>', 25.084098, 39.234531, '3', 'ST_03'],
      ['<div style="font-size:'+getFontSize()+';color:black;">Driver No: ST04<br>Location:Makkah Al Mukarramah Rd<br>EST Trip completion: N/A<br><a href="mapcanvas.html">View Driver Route</a></div>', 23.769336, 44.777977, '4', 'ST_04'],
      ['<div style="font-size:'+getFontSize()+';color:black;">Driver No: ST05<br>Location:King Fahad Rd, Al Bahah<br>EST Trip completion: N/A<br><a href="mapcanvas.html">View Driver Route</a></div>', 20.037963, 41.491884, '5', 'ST_05']
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(21.478503, 40.566196),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
      var lable = locations[i][4];
      var text = locations[i][3];
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        icon: icon,
        map: map,
        label: {
        text: text,
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: '"Courier New", Courier,Monospace',
        color: 'white'
      }
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
          toggleBounce(marker);
          google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.setAnimation(null);//removes the marker
            // then, remove the infowindows name from the array
          });
        }
      })(marker, i));



    }

    map.fitBounds(bounds);
    },

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};
app.initialize();

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
function setFontSizeToLarge() {
  var devicetype = device.platform;
  if (devicetype == 'Android') {
    document.getElementById("body").style.fontSize = "large";
    document.getElementById("resetMap").style.fontSize = "large";
    document.getElementById("goback").style.fontSize = "large";
    document.getElementById("bottom").style.fontSize = "large";
  }
}
