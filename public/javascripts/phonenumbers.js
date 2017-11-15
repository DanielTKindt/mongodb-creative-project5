$(document).ready(function(){
  $("#postPhoneNumber").click(function(){
    var myobj = {
      Name:     $("#name").val(),
      PhoneNumber:  $("#phonenumber").val()
    };
    jobj = JSON.stringify(myobj);
    $("#json").text(jobj);

    var url = "phonenumber";
    $.ajax({
      url:  url,
      type: "POST",
      data: jobj,
      contentType:  "application/json; charset=utf-8",
      success:  function(data,textStatus) {
        $("#done").html(textStatus);
      }
    })
  });//End of postPhoneNumber

  $("#getPhoneNumbers").click(function() {
    $.getJSON('phonenumber', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var phonenum in data) {
        phone = data[phonenum];
  	everything += "<li> Name: " +
		      phone.Name + " -- PhoneNumber: " +
		      phone.PhoneNumber + "</li>";
      }
      everything += "</ul>";
      $("#phone").html(everything);
    })
  });//End of getPhoneNumbers

  $("#deletePhoneNumbers").click(function() {
    var url = "phonenumber";
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(data) {
        console.log("DELETE was successful");
      }
    })
    $x("#json").text("Deleted phone numbers");    
  });//End of deletePhoneNumbers

});
