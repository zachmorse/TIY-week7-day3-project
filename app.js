const express = require("express");
const app = express();
const data = require("./data.js");
const port = 8000;
var exampleIndex;

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

app.get("/", function(req, res) {
  res.render("index", { userListing: data.users });
});

app.use(express.static("views"));

app.get("/:id", function(req, res) {
  var index = req.params.id - 1;
  res.render("details", { userListing: data.users[index] });
});

app.use(express.static("views"));

app.listen(port, function() {
  console.log("Server is running on port " + port);
});
