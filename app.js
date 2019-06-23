// import congiuration
const config = require("config");
//import helmet for setting http headers
const helmet = require("helmet");
// import morgan for logging request
const morgan = require("morgan");
// joi for validating params
const Joi = require("joi");
// import the logger middleware
const logger = require("./logger");
// import authentication middleware
const auth = require("./authenticate");
// import express
const express = require("express");
const app = express();

// parsing the body
app.use(express.json());
// serving status file
app.use(express.static("public"));
// add urlencoded middlewware
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// configuration
console.log(`Applicaation Name: ${config.get("name")}`);
console.log(`Applicaation Host: ${config.get("mail.host")}`);
// console.log(`Applicaation Password: ${config.get("mail.pass")}`);  // bug, it keeps say mail.password is not define

// setting morgan to run in development mode
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}
// adding middleware function to your app
app.use(logger);

// add authentication middleware f unction
app.use(auth);

// model course in array
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
app.get("/", function(req, res) {
  res.send("Hello world!!");
});

app.get("/api/courses", function(req, res) {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // validating input from client, never trust client data
  // using joi package for your validation
  // note joi is a class model so use Pascal case to name it
  // next define a schema for your object that you are expecting from the client end
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // if error send error to client
  // simplify the error message send to the client to easy of rendering

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
// get book by id
app.get("/api/courses/:id", (req, res) => {
  //  loop over course to find the course you are looking for
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // send message if not found
  if (!course)
    return res.status(404).send("The course withthe given ID is not found");
  // return found course
  return res.send(course);
});

// implementating update (PUT method)
app.put("/api/courses/:id", (req, res) => {
  // first of all look up the course in db
  // if not exist return 4040(not found)
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course not found`);

  // validate the course
  // if invalid, return 404 - bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // push the value from the user request body to update the course
  // update course
  // return the course to the client
  course.name = req.body.name;
  res.status(200).send(course);
});

// implement delete
app.delete("/api/courses/:id", (req, res) => {
  // lookup the course and validate the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course not found`);

  // delete the course from the database
  const index = courses.indexOf(course);
  // use splica to delete the item from db
  courses.splice(index, 1);

  res.send(course);
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

//  validate schema function
function validateCourse(course) {
  const shema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, shema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
