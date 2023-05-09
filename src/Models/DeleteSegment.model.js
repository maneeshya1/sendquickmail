'user strict';
var dbConn = require('./../../config/db.config');

exports.delete = function (segment_Id, result) {
    dbConn.query('call sendquickmail_db.Delete_Segment(?)', [segment_Id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};