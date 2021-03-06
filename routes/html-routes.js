// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the users page
    if (req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/Craigzone");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/Craigzone", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Craigzone.html"));
  });

  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  // app.get("/Craigzone", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/Craigzone.html"));
  // });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  //   app.get("/user", isAuthenticated, function(req, res) {
  //     res.render("user", {
  //       city: "Denver",
  //       item: "Cat",
  //       priceMin: 0,
  //       priceMax: 100,
  //       condition: false
  //     });
  //   });
};
