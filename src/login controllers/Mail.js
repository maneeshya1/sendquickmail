const conn = require('./../../config/db.config')
const cron = require("node-cron");
var nodemailer = require("nodemailer");
const { request } = require('express');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey')


exports.Mail = async (req, res, next) => {

   const encryptedString = await cryptr.encrypt(req.body.pass); //info pass decrpt     
  const decry =await cryptr.decrypt(encryptedString);
    console.log("decryptedString", encryptedString);
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user:req.body.user,
      pass:decry
    }
  });

  console.log(req.body);
  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: req.body.from, // sender address (who sends)
    to: req.body.To,              // list of receivers (who receives)
    subject: req.body.subject, // Subject line
    text: 'Hello I am Maneesh Yadav.working at the backend using nodejs  ', // plaintext body
    html: req.body.html,
  };
//--------------------------------------------------------------------
  var p_date = req.body.Date;
  let time = req.body.Time;

  var date_time = p_date + " " + time;
  console.log("This is date time.... " + date_time);


  var date = new Date(p_date);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  
  console.log("This is month.... " + month);

  let [hours, mins] = time.split(":");
  // console.log("This is hrs.... " + hours);
  // console.log("This is hrs.... " + mins);

  var new_var = '5 ' + mins + " " + hours + " " + + day + '-' + day + " " + month + ' *';
  console.log("This is new variable" + new_var.toString());
  // cron.schedule(`${5} ${45} ${16} ${day - day} * *`, function () {
  cron.schedule(new_var.toString(), function () {

    console.log('---------------------' + day);
    console.log('Running Cron Process');
   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  });
}
