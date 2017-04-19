var map;
var bounds;
var usercount = 0;
var userlist = [];
var phonelist = [];
var latitudelist = [];
var longitudelist = [];
var addresslist = [];
var latitude = 123;
var longitude = 123;
var locationfetched = false;

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


    onSuccess: function(position) {
      getallusers();
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      codeLatLng(latitude,longitude);
      var latLong = new google.maps.LatLng(latitude, longitude);
      bounds = new google.maps.LatLngBounds();
      var mapOptions = {
          center: latLong,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);


    },

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};
app.initialize();

function populatemap() {
  var latLong = new google.maps.LatLng(latitude, longitude);
  bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      center: latLong,
      zoom: 12,
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


    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    for (i = 0; i < usercount; i++) {
      var position = new google.maps.LatLng(latitudelist[i], longitudelist[i]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        icon: icon,
        map: map,
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var contentString = '<div style="color:black;">'+userlist[i]+'<br>Location:'+addresslist[i]+'<br>EST Trip completion: N/A<br><a href="driverroute.html">View Driver Route</a></div>';
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
          toggleBounce(marker);
          google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.setAnimation(null);//removes the marker
            // then, remove the infowindows name from the array
          });
        }
      })(marker, i));
    }
    //map.fitBounds(bounds);
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

function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
       saveaddress(lat,lng, results[0].formatted_address);
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}

function saveaddress(lat,lng,addr) {
  saveuserlocation(lat,lng,addr);
  setInterval(function()
  {
    getmylocation(lat,lng);

  },10000)

}

function getmylocation(lat,lng) {
   latitude = lat;
   longitude = lng;
   navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    if(lat !=latitude && lng != longitude) {
      codeLatLng(lat, lng)
      if(locationfetched) {
        populatemap();
        $('#loading').hide();
      }
    }
}

function errorFunction(){
    alert("Geocoder failed");
}

function saveuserlocation(lat,lng,addr) {
  var number = window.localStorage.getItem("phonenumber");
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/saveuserlocation/",
    data       : {phonenumber:number, latitude :lat,longitude :lng, address: JSON.stringify(addr)},
    dataType   : 'json',
    success    : function(response) {

    },
    error      : function(response) {

      alert(response.responseText);
    },
    complete : function(response) {
      //getuserlocation();
    },
});
}

function getallusers() {
  $('#loading').show();
  var noerror = true;
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/getallusers/",
    dataType   : 'json',
    success    : function(response) {
      //alert("getallusers"+JSON.stringify(response));

    },
    error      : function(response) {
      noerror = false;
      alert("getalluserserror"+response);
    },
    complete : function(response) {
      if(noerror) {
        //usercount = response.length;
        usercount = 0;
        var items = JSON.parse(response.responseText);
        $.each(items, function(index, value) {
          usercount++;
          userlist[index] = value.user_name;
          phonelist[index] = value.phone;
          getuserlocation(value.phone,index);
        });
      } else {
        alert("Error so no processing");
      }

    },
});
}

function getalllocations() {
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/getalllocations/",
    dataType   : 'json',
    success    : function(response) {
      $.each(response, function(index, value) {
        latitudelist[index] = value.latitude;
        longitudelist[index] = value.longitude;
        addresslist[index] = value.address;
      });
    },
    error      : function(response) {
      alert("getalllocationserror"+response);
    },
    complete : function(response) {
      //getuserlocation();
    },
});
}

function getuserlocation(number,index) {
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/getuserlocation/",
    data       : {phonenumber:number},
    dataType   : 'json',
    success    : function(response) {
      //alert("success location"+response[0]);
      latitudelist[index] = response[0].latitude;
      longitudelist[index] = response[0].longitude;
      addresslist[index] = response[0].address;
      locationfetched = true;
    },
    error      : function(response) {
      alert(response.responseText);
    },
    complete : function(response) {

    },
});
}
