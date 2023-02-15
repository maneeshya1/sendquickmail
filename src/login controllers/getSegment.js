const dbConn = require('./../../config/db.config');
exports.getSegment = (req, res) => {
    dbConn.query('SELECT * FROM tbl_segment ', (err, rows, fields) => {
            if (!err)
                    res.send(rows);
            else {
                    res.send(err);
                    console.log("user not exist");
            }
    })
};
