const dbConn = require('./../../config/db.config').promise();

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
            "SELECT * FROM `tbl_contactdetails` WHERE `contact_id`= ?",
            [req.body.contact_id]
          );
          console.log("tbl_contactdetails..............", row_a);
          if (row_a.length > 0) {
            return res.json({
              success: "true",
              message: "contact Id matched Successfully",
              data: row_a[0],
            });
          } else {
            return res.json({
              status: 404,
              message: "Invalid contact Id ",
            });
          }
        } catch (err) {
          console.log("err...", err);
          next(err);
        }
      };