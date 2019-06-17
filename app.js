// import express

const express = require("express");
const app = express();

// model course in array
const courses = [
  { id: 1, courae: "course1" },
  { id: 2, courae: "course2" },
  { id: 3, courae: "course3" }
];
app.get("/", function(req, res) {
  res.send("Hello world!!");
});

app.get("/api/courses", function(req, res) {
  res.send(courses);
});

// get book by id
app.get("/api/courses/:id", (req, res) => {
  //  loop over course to find the course you are looking for
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // send message if not found
  if (!course) res.status(404).send("The course withthe given ID is not found");
  // return found course
  return res.send(course);
});

// date and month in the request params
// app.get("/api/post/:year/:month", (req, res) => {
//   res.send(req.params);
// });

// getting query paramsw fro request
// app.get("/api/post/:year/:month", (req, res) => {
//   res.send(req.query);
// });
// define an environmental value
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
