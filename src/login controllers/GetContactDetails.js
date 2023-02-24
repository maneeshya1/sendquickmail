const dbConn = require('./../../config/db.config').promise();
const dbConn_WP = require('./../../config/db.config');

// exports.GetContactDetails = (req, res) => {
//         dbConn.query('SELECT `user_Details`,`contact_Email` FROM `tbl_contactdetails` WHERE `contact_Email`= ?', [req.params.contact_Email], (err, rows, fields) => {
//                 if (!err)
//                         res.send(rows);
//                 else {
//                         res.send(err);
//                         console.log("contact not exist");
//                 }
//         })
// };

// exports.GetContactDetails = (req, res) => {
//         dbConn.query('SELECT * FROM tbl_contactdetails ', (err, rows, fields) => {
//                 if (!err)
//                         res.send(rows);
//                 else {
//                         res.send(err);
//                         console.log("user not exist");
//                 }
//         })
// };

exports.GetContactDetails = async (req, res, next) => {
        try {
          console.log("execute....");
          const [row_a] = await dbConn.execute(
            "SELECT * FROM `tbl_contactdetails` WHERE `company_Id`= ?",
            [req.body.company_Id]
          );
          console.log("tbl_contactdetails..............", row_a);
          if (row_a.length > 0) {
            return res.json({
              success: "true",
              message: "company Id matched Successfully",
              data: row_a,
            });
          } else {
            return res.json({
              status: 404,
              message: "Invalid company Id ",
            });
          }
        } catch (err) {
          console.log("err...", err);
          next(err);
        }
      };