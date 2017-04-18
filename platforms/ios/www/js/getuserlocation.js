if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

var latitude = 123;
var longitude = 123;
function getmylocation(lat,lng) {
   latitude = lat;
   longitude = lng;
   navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    if(lat !=latitude && lng != longitude) {
      codeLatLng(lat, lng)
    }

}

function errorFunction(){
    alert("Geocoder failed");
}

  function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
         //formatted address
         saveaddress(lat,lng, results[0].formatted_address);
        //find country name
        //      for (var i=0; i<results[0].address_components.length; i++) {
        //     for (var b=0;b<results[0].address_components[i].types.length;b++) {
        //
        //     //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
        //         if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
        //             //this is the object you are looking for
        //             city= results[0].address_components[i];
        //             break;
        //         }
        //     }
        // }
        //city data
        //alert(city.short_name + " " + city.long_name)


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

        alert("saveloationerror"+response.responseText);
      },
      complete : function(response) {
        //getuserlocation();
      },
  });
  }

  function getuserlocation(number) {
    $.ajax({
      type       : "get",
      url        : "http://shamnadps.pythonanywhere.com/salestracker/getuserlocation/",
      data       : {phonenumber:number},
      dataType   : 'json',
      success    : function(response) {
        alert("success location"+response[0].id);
      },
      error      : function(response) {
        alert(response.responseText);
      },
      complete : function(response) {
      },
  });
  }
