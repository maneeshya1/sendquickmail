var dbConn = require('./../../config/db.config');

//TimeSheet object create
var Segment = function (Segmentdata) {

    this.contact_id = Segmentdata.contact_id;
    this.firstName = Segmentdata.firstName;
    this.lastName = Segmentdata.lastName;
    this.contact_Email = Segmentdata.contact_Email;
    this.contact_Number = Segmentdata.contact_Number;

    // this.Task = Segmentdata.Task;
    this.company_Id = Segmentdata.company_Id;
};

Segment.findBySearch = function (params, result) {
    let firstName = params.firstName;
    let lastName = params.lastName;
    let contact_Email = params.contact_Email;
    var sql = 'SELECT * FROM tbl_contactdetails WHERE firstName = ? OR lastName = ? OR contact_Email = ?';
    dbConn.query(sql, [firstName, lastName, contact_Email
    ], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Segment;