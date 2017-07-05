const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const routes = require("./routes");
const port = 8000;

//middleware

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");
app.use(express.static("views"));

// routes, redirect to routes.js

app.use("/", routes);

// listener
app.listen(port, function() {
  console.log("Server is running on port " + port);
});
