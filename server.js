var express = require("express");
var path = require("path");
var session = require("express-session");
const hbs = require("express-handlebars");
const scraper = require("./app/timscraper.js");
const passport = require("passport");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

// //handlebars stuff
// app.engine(
//   "hbs",
//   hbs({
//     extname: "hbs",
//     defaultLayout: "user",
//     layoutsDir: __dirname + "/public/handlebars/"
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Static directory
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

let dump = scraper.data.craigScrape("denver", "pool table", 0, 5000);
