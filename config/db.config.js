'user strict';

const mysql = require('mysql2');

//local mysql db connection
const dbConn = mysql.createConnection({
  
  host: "103.228.83.115", 
  user: "root", // USER NAME
  database: "sendquickmail_db", // DATABASE NAME
  password: "Cylsys@678",
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;