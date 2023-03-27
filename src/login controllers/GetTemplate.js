const dbConn = require('./../../config/db.config')
exports.GetTemplate = (req, res) => {
    dbConn.query('SELECT template_Name FROM tbl_template ', (err, rows, fields) => {
            if (!err)
                    res.send(rows);
            else {
                    res.send(err);
                    console.log("user not exist");
            }
    })
};