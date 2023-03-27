const dbConn = require('./../../config/db.config')

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

exports.GetAllContactDetails = (req, res) => {
        dbConn.query('SELECT * FROM tbl_contactdetails ', (err, rows, fields) => {
                if (!err)
                        res.send(rows);
                else {
                        res.send(err);
                        console.log("user not exist");
                }
        })
};