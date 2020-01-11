var express = require("express");
var path = require("path");
const hbs = require("express-handlebars");
const scraper = require("./app/timscraper.js");

// var app = express();
// var PORT = process.env.PORT || 8080;

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

let dump = scraper.data.craigScrape("denver", "pool table", 0, 5000);

// console.log(scraper);

// console.log(scraper.data.craigScrape);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Static directory
// app.use(express.static("public"));

// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });
