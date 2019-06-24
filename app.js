const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./logger");
const routes = require("./routes/courses");
const home = require("./home/home");
const auth = require("./authenticate");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use(logger);
app.use(auth);

app.use("/api/courses", routes);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
