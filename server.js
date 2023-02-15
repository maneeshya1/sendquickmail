const express = require('express');
const multer = require("multer");
const bodyParser = require('body-parser');
// const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const dbConn = require("./config/db.config");

require("dotenv").config();

// create express app
const app = express();
app.set('view engine', 'ejs');

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
// const Pending_report = require('./src/routes/PendingReport.routes')


// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
  next();
});

const routes = require('./src/routes/routes');
const routes1 = require('./src/routes/contact.route');

// -----------------------
const DeleteSegmentRoutes = require('./src/routes/DeleteSegment.route');

app.use('/DeleteSegment', DeleteSegmentRoutes);
// -----------------------------


app.use(routes);
app.use(routes1);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});