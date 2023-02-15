const dbConn = require('../../config/db.config')

// exports.GetContact = async (req, res) => {

//          dbConn.query('SELECT * FROM contactss WHERE `contact_Email` = ?', [req.params.contact_Email], (err, rows, fields) => {
//                 if (!err) {
//                         res.send(rows);
//                         console.log("rows...................", rows);
//                 } else {
//                         res.send(err);
//                         console.log("user not exist");
//                 }
//         })
// };

exports.getAllUser = (req, res) => {
        dbConn.query('SELECT * FROM contactss ', (err, rows, fields) => {
                if (!err)
                        res.send(rows);
                else {
                        res.send(err);
                        console.log("user not exist");
                }
        })
};

