'user strict';
var dbConn = require('./../../config/db.config');

exports.delete = function (template_Id, result) {
    dbConn.query('DELETE FROM tbl_template WHERE template_Id = ?', [template_Id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};