function log(req, res, next) {
  console.log("Logging...");
  next(); // this move to the next middle ware function
}

module.exports = log;
