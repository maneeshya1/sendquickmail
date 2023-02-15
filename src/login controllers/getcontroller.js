const dbConn = require('./../../config/db.config')

exports.getUserName = (req, res) => {
        dbConn.query('SELECT `Name`,`Email` FROM invite_users WHERE email = ?', [req.params.email], (err, rows, fields) => {
                if (!err)
                        res.send(rows);
                else {
                        res.send(err);
                        console.log("user not exist");
                }
        })
};

exports.getAllUser = (req, res) => {
        dbConn.query('SELECT * FROM invite_users ', (err, rows, fields) => {
                if (!err)
                        res.send(rows);
                else {
                        res.send(err);
                        console.log("user not exist");
                }
        })
};

