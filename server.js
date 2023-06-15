const express = require('express');
const multer = require("multer");
const bodyParser = require('body-parser');
// const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const dbConn = require("./config/db.config");
const nodemailer = require('nodemailer');

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
//--------------------------------------------------------------------------------------------------------

// const cors = require('cors');
// app.use(cors({
//   origin: ['http://test.sendquickemail.com/']
//   }));
const cors = require('cors');
app.use(cors({
  origin: 'http://test.sendquickemail.com'
}));
//------------------------------------------------------------------------------------------
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
const routes2 = require('./src/routes/NewGetSegment');
const routes3 = require('./src/routes/company');
const routes4 = require('./src/routes/list');
// -----------------------
const DeleteSegmentRoutes = require('./src/routes/DeleteSegment.route');
const DeleteTemplateRoutes = require('./src/routes/DeleteTemplate.route');

app.use('/DeleteSegment', DeleteSegmentRoutes);
app.use('/DeleteTemplate', DeleteTemplateRoutes);
// -----------------------------


app.use(routes);
app.use(routes1);
app.use(routes2);
app.use(routes3);
app.use(routes4);

//---------------------forgot-password---------------------------------------------------------------------


app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP in the database
  dbConn.query('UPDATE invite_users SET otp = ? WHERE email = ?', [otp, email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      // service: 'your_email_service_provider',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: "maneeshy440@gmail.com",
        pass: "wjnkxqtdsjipamxc",
      },
    });

    const mailOptions = {
      from: "maneeshy440@gmail.com",
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send OTP' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    });
  });
});

// ---------------------------------------------------------------------------------------------
app.put('/api/users/otp', (req, res) => {
  const { otp } = req.body;
  const { Password } = req.body;

  // Execute the update query
  const query = 'UPDATE invite_users SET Password = ? WHERE otp = ?';
  dbConn.query(query, [Password, otp], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update Password' });
    } else {
      res.json({ message: 'Password updated successfully' });
    }
  });
});

// -------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});