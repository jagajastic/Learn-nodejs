const express = require("express");
const home = express.Router();

home.get("/", function(req, res) {
  res.render("index", { title: "My Express app", message: "RESTful API" });
});

module.exports = home;
