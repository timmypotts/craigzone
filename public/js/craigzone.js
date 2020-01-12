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

    saveSearch(
      searchData.city,
      searchData.item,
      searchData.priceMin,
      searchData.priceMax
    );
    cityInput.val("");
    console.log();
    itemInput.val("");
    minInput.val("");
    maxInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function saveSearch(city, item, priceMin, priceMax) {
    $.put("/api/search", {
      city: city,
      item: item,
      priceMin: priceMin,
      priceMax: priceMax
    }).then(function(data) {
      next();
      // If there's an error, handle it by throwing up a bootstrap alert
    });
  }
});
