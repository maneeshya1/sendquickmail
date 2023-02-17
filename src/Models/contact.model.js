'user strict';
var dbConn = require('./../../config/db.config').promise();

var contact = function (result) { };

contact.create = async (contact, result) => {
    let contactValues = [];
    let contactValues_NotAdded = [];
    // console.log("contact.......", contact);

    for (let i = 0; i < contact.length; i++) {
        let check_contact_Email = contact[i];
        // console.log(contact[i]?.contact_Email);
        console.log("check_contact_Email.........", check_contact_Email);

        const [rowFindUser] = await dbConn.execute('SELECT * FROM `contactss` WHERE `contact_Email` = ?', [check_contact_Email?.contact_Email]);
        if (rowFindUser?.length > 0) {
            console.log('true.................................', rowFindUser);
            contactValues_NotAdded.push({
                contact_Email: check_contact_Email?.contact_Email,
            });
        }
        else {
            console.log('false.................................', rowFindUser);

            // for (let i = 0; i < contact?.length; i++) {
            // // contactValues.push([
            // contact[i].contact_Email,
            //     contact[i].first_Name,
            //     contact[i].last_Name,
            //     contact[i].country,
            //     contact[i].city,
            //     contact[i].company_Id,
            //     // ])
            //     // contactValues.push({});
            // }

            // await dbConn.query("INSERT INTO contactss(contact_Email,first_Name,last_Name,country,city,company_Id) VALUES ?", [contactValues],
            const [rows_add] = await dbConn.query("Insert into contactss(contact_Email, first_Name, last_Name, country, city, company_Id) values(?,?,?,?,?,?)",
                [
                    contact[i].contact_Email,
                    contact[i].first_Name,
                    contact[i].last_Name,
                    contact[i].country,
                    contact[i].city,
                    contact[i].company_Id,
                ],
                // function (err, res) {
                //     if (err)
                //         throw err;
                //     console.log("exp of records inserted: " + res.affectedRows);

                //     result(null, res.insertId);
                // }
            );
            console.log("rows_add.....", i, rows_add?.affectedRows);
            if (rows_add.affectedRows === 1) {
                contactValues.push({
                    contact_Email: contact[i].contact_Email,
                    // contact[i].first_Name,
                    // contact[i].last_Name,
                    // contact[i].country,
                    // contact[i].city,
                    // contact[i].company_Id,
                })
            }
        }
    };
    let data = { newllyAdded: contactValues, alreadyExists: contactValues_NotAdded }

    // return resp.status(201).json({
    //     success: true,
    //     message: "All users has been successfully inserted.",
    //     data: { newllyAdded: contactValues, alreadyExists: contactValues_NotAdded }
    // });
    result(null, data);

};


contact.findById = function (id, result) {
    dbConn.query("Select * from contactss where contactID = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
contact.findAll = function (result) {
    dbConn.query("Select * from contactss", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('contactss : ', res);
            result(null, res);
        }
    });

};
module.exports = contact;