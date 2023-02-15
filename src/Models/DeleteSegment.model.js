'user strict';
var dbConn = require('./../../config/db.config');

exports.delete = function (segment_Id, result) {
    dbConn.query("DELETE FROM tbl_segment WHERE segment_Id = ?", [segment_Id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};