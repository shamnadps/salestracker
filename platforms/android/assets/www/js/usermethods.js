function getallusers() {
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/getallusers/",
    dataType   : 'json',
    success    : function(response) {
      alert("getallusers"+JSON.stringify(response));
      $.each(response, function(index, value) {

        alert("phone:"+value.phone);
        alert("username:"+value.user_name);
      });
    },
    error      : function(response) {
      alert("getalluserserror"+response);
    },
    complete : function(response) {
      //getuserlocation();
    },
});
}

function getalllocations() {
  $.ajax({
    type       : "get",
    url        : "http://shamnadps.pythonanywhere.com/salestracker/getalllocations/",
    dataType   : 'json',
    success    : function(response) {
      alert("gotalllocations"+JSON.stringify(response));
      if (response.length > 0) {
        alert(response[0]);
      }
    },
    error      : function(response) {
      alert("getalllocationserror"+response);
    },
    complete : function(response) {
      //getuserlocation();
    },
});
}
