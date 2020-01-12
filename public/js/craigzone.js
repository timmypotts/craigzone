$(document).ready(function() {
  // Getting references to our form and input
  console.log("Whats up");
  var searchParams = $("form.search");
  var cityInput = $("input#city-input");
  console.log(cityInput);
  var itemInput = $("input#item-input");
  var minInput = $("input#priceMin-input");
  var maxInput = $("input#priceMax-input");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#submit").click(function() {
    event.preventDefault();
    console.log("click");
    var searchData = {
      city: cityInput.val().trim(),
      item: itemInput.val().trim(),
      priceMin: minInput.val().trim(),
      priceMax: maxInput.val().trim()
    };
    console.log(searchData);

    saveSearch(searchData);
    cityInput.val("");
    console.log();
    itemInput.val("");
    minInput.val("");
    maxInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function saveSearch(searchData) {
    $.ajax({
      method: "PUT",
      url: "/api/search",
      data: searchData
    }).then(function() {
      console.log("Success");
    });
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
