"user strict";
var dbConn = require("./../../config/db.config").promise();
var dbConn_WP = require("./../../config/db.config");

var contact = function (result) {};

contact.create = async (contact, result) => {
  let contactValues = [];
  let contactValues_NotAdded = [];
  // console.log("contact.......", contact);

  for (let i = 0; i < contact.length; i++) {
    let check_contact_Email = contact[i];
    // console.log(contact[i]?.contact_Email);
    console.log("check_contact_Email.........", check_contact_Email);

    const [rowFindUser] = await dbConn.execute(
      "SELECT * FROM `contactss` WHERE `contact_Email` = ?",
      [check_contact_Email?.contact_Email]
    );
    if (rowFindUser?.length > 0) {
      console.log("true.................................", rowFindUser);
      contactValues_NotAdded.push({
        contact_Email: check_contact_Email?.contact_Email,
      });
    } else {
      console.log("false.................................", rowFindUser);

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
      const [rows_add] = await dbConn.query(
        "Insert into contactss(contact_Email, first_Name, last_Name, country, city, company_Id) values(?,?,?,?,?,?)",
        [
          contact[i].contact_Email,
          contact[i].first_Name,
          contact[i].last_Name,
          contact[i].country,
          contact[i].city,
          contact[i].company_Id,
        ]
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
        });
      }
    }
  }
  let data = {
    success: true,
    newllyAdded: contactValues,
    alreadyExists: contactValues_NotAdded,
  };

  // return resp.status(201).json({
  //     success: true,
  //     message: "All users has been successfully inserted.",
  //     data: { newllyAdded: contactValues, alreadyExists: contactValues_NotAdded }
  // });
  result(null, data);
};

contact.findById = function (contactID, result) {
  console.log("contactID.....", contactID);
  dbConn_WP.query(
    "Select * from contactss where contactID = ?",
    contactID,
    function (err, res) {
      if (err) {
        console.error("error: ", err);
        result(err, null);
      } else {
        console.log("res......", res);
        result(null, res);
      }
    }
  );
};

contact.updateByEmail = function (Contact, result) {
  console.log("Contact_email.....", Contact?.contact_Email);
  console.log("Contact_body.....", Contact);
  dbConn_WP.query(
    "Select * from contactss where contact_Email = ?",
    Contact?.contact_Email,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("res......", res);
        dbConn_WP.query(
          "UPDATE contactss SET isActive = ? WHERE contact_Email = ?",
          [Contact?.isActive, Contact?.contact_Email],
          function (upErr, updateResp) {
            if (upErr) {
              console.log("error: ", upErr);
              result(upErr, null);
            } else {
              console.log("updateResp......", updateResp);
              result(null, updateResp);
            }
          }
        );
      }
    }
  );
};

contact.updateById = function (
  // id,
  Contact,
  result
) {
  //   console.log("Contact_id.....", id);
  console.log("Contact_body.....", Contact);
  dbConn_WP.query(
    "Select * from contactss where contactID = ?",
    Contact?.id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("res......", res);
        let checkValue = "";
        if (typeof Contact?.isActive == "boolean") {
          checkValue = Contact.isActive;
          console.log("checkValue_true...", checkValue);
        } else {
          checkValue = res?.isActive;
          console.log("checkValue_false...", checkValue);
        }

        dbConn_WP.query(
          "Update contactss SET contact_Email=?, first_Name=?, " +
            "last_Name=?, country=?, company_Id=?, city=?, isActive = ?, " +
            "CreatedBy=?, modifiedDate=? " +
            "where contactID = ?",
          [
            Contact?.contact_Email || res?.contact_Email,
            Contact?.first_Name || res?.first_Name,
            Contact?.last_Name || res?.last_Name,
            Contact?.country || res?.country,
            Contact?.city || res?.city,
            Contact?.company_Id || res?.company_Id,
            checkValue,
            Contact?.CreatedBy || res?.CreatedBy,
            Contact?.modifiedDate || res?.modifiedDate,
            Contact?.id,
          ],
          function (upErr, updateResp) {
            if (upErr) {
              console.log("error: ", upErr);
              result(upErr, null);
            } else {
              console.log("res......", updateResp);
              result(null, updateResp);
            }
            result(null, res);
          }
        );
      }
    }
  );
};

contact.findAll = function (result) {
  dbConn_WP.query("Select * from contactss", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("contactss : ", res);
      result(null, res);
    }
  });
};

module.exports = contact;
