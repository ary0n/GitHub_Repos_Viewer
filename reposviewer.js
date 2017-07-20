var urlPrefix = "https://api.github.com/users/";
var urlSuffix = "/repos";

var $table = $("#repoTable");
var $userName = $("#userNameSearch");
var $errorText = $("#errorText");


function appendTableRow(item) {
  var imageTag = "<img src=" + item.owner.avatar_url + " alt='Github Avatar' style='width:75px;height:75px;'>";
  var urlTag = "<a href=" + item.html_url + ">" + item.html_url + "</>";
  $table.append("<tr><td align='center'>" + item.name + "</td><td align='center'>" + urlTag + "</td><td align='center'>" + item.owner.login + "</td><td align='center'>" + imageTag + "</td></tr>");
}


$("#submitButton").click(function() {
  //clear the table
  $table.find("tr:gt(0)").remove();

  $.ajax({
    type: "GET",
    url: urlPrefix + $userName.val() + urlSuffix,
    success: function(data) {
      if ($table.is(':hidden'))
        $table.show();
      if ($errorText.text().trim().length)
        $errorText.html("");
      $.each(data, function(i, item) {
        appendTableRow(item);
      })
    },
    error: function(xhr, status, error) {
      $table.hide();
      if (xhr.status == 404)
        $errorText.html("No Github account found for user: " + $userName.val());
      else {
        $errorText.html("Error making HTTP Request to " + urlPrefix + $userName.val() + urlSuffix);
      }
    }

  })

});
