const dbConn = require('./../../config/db.config')

// .............template.......................................
exports.GetTemplate = (req, res) => {
    dbConn.query('call sendquickmail_db.Gat_template_Name()', (err, rows, fields) => {
            if (!err)
                    res.send(rows[0]);
            else {
                    res.send(err);
                    console.log("user not exist");
            }
    })
};