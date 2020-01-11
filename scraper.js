var jquery = require("jquery");
var Nightmare = require("nightmare");
nightmare = Nightmare();

var city = process.argv[2];
var search = process.argv[3];

//variables  for user input on the searches

nightmare
  .goto(
    "http://" + city + ".craigslist.org/search/sss?query=" + search 
  )
  // visits the city specified by the user and by what product they are looking for by user
  .wait(2000)
  //wait 2 seconds so page is guarenteed to fully load
  .evaluate(function() {
    var stuff = [];
    //create an array to hold all gigs gathered by following code
    $(".hdrlnk").each(function() {
      item = {};
      item["title"] = $(this).text();
      item["link"] = $(this).attr("href");
      stuff.push(item);
    });
    //create a gig object with title and link, then push to the 'gigs' array
    return stuff;
    // pass the gigs array forward so it can be looped through later on
  })
  .end()
  .then(function(result) {
    for (stuff in result) {
      console.log(result[stuff].title);
      console.log(result[stuff].link);
      console.log("/n");
    }
  });
