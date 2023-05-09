const dbConn = require('./../../config/db.config');
exports.getSegment = (req, res) => {
    dbConn.query('call sendquickmail_db.GetAllsegment()', (err, rows, fields) => {
            if (!err)
                    res.send(rows);
            else {
                    res.send(err);
                    console.log("user not exists");
            }
    })
};
