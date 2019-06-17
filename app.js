// import express

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello world!!");
});

app.get("/api/courses", function(req, res) {
  res.send([1, 2, 3, 4]);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
