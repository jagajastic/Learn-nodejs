// import express

const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello world!!");
});

app.get("/api/courses", function(req, res) {
  res.send([1, 2, 3, 4]);
});

// get book by id
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

// date and month in the request params
// app.get("/api/post/:year/:month", (req, res) => {
//   res.send(req.params);
// });

// getting query paramsw fro request
app.get("/api/post/:year/:month", (req, res) => {
  res.send(req.query);
});
// define an environmental value
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
