var dbConn = require('./../../config/db.config');

//TimeSheet object create
var Segment = function (Segmentdata) {

    this.contact_id = Segmentdata.contact_id;
    this.firstName = Segmentdata.firstName;
    this.lastName = Segmentdata.lastName;
    this.contact_Email = Segmentdata.contact_Email;
    this.contact_Number = Segmentdata.contact_Number;const { log } = require('util');
    const dbConn = require('./../../config/db.config');
    
    // Segment object constructor
    const Segment = function (Segmentdata) {
        this.contact_id = Segmentdata.contact_id;
        this.first_Name = Segmentdata.first_Name;
        this.lastName = Segmentdata.lastName;
        this.contact_Email = Segmentdata.contact_Email;
        this.contact_Number = Segmentdata.contact_Number;
        this.company_Id = Segmentdata.company_Id;
    };
    
    Segment.findBySearch = function (params) {
        const param_key = Object.keys(params)[0]; // Assuming only one key in params object
        let param_value = '';
        console.log("Mani",param_key);
        if (param_key === 'contact_Email') {
            param_value = params.contact_Email;
            const sql = 'CALL GetUserByEmail(?)';
    
            return new Promise((resolve, reject) => {
                dbConn.query(sql, param_value, (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("Jashi",results);
                    resolve(results);
                });
            });
        } else if (param_key === 'first_Name') {
            param_value = params.first_Name; // corrected parameter key
            const sql = 'call GetUserByFirstName(?)'
            return new Promise((resolve, reject) => {
                dbConn.query(sql, param_value, (error, results) => {
                    console.log("Akhi",sql);
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("Honey",results);
                    resolve(results);
                });
            });
        } else {
            return Promise.reject('Invalid search parameter');
        }
    };
    
    module.exports = Segment;
    

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