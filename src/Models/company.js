'use strict';
var dbConn = require('../../config/db.config');
//Employee object create
var Employee = function (user) {
  this.companyName = user.companyName;
  this.companyEmail = user.companyEmail;
  this.companyURL = user.companyURL;
  this.remark = user.remark;
  this.Phone_Number = user.Phone_Number;
  this.Number_of_Employe = user.Number_of_Employe;
  this.companyLocation = user.companyLocation;
  this.UserId = user.UserId;
  this.isActive = user.isActive
  this.company_Id = user.company_Id
  //   this.budget = user.budget
  //   this.description = user.description
  // this.Action     = user.Action
  // this.created_at     = new Date();
  // this.updated_at     = new Date();
};



Employee.create = function (newLeaves, result) {
  var k = Object.values(newLeaves)

  dbConn.query('call sendquickmail_db.company_registration(?,?,?,?,?,?,?,?,?)', k, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(res.insertId, res[0]);
    }
  });
};
//

  Employee.findById = function (id, result) {
    dbConn.query("Select * from company_ragistration where company_Id = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };

  Employee.findByUserID = function (id, result) {
    dbConn.query("Select * from company_ragistration where UserId = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };



Employee.findAll = function (result) {
  console.log("Mmmmmmmm", result);
  dbConn.query("call sendquickmail_db.GetAllCompany()", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('user : ', res);
      result(null, res);
    }
  });
};


Employee.update = function (company_Id, user, result) {
  dbConn.query("call sendquickmail_db.update_company_registration (?,?,?,?,?,?,?,?,?)",
    [user.companyName, user.companyEmail, user.companyURL, user.remark, user.Phone_Number, user.Number_of_Employe, user.companyLocation,  user.UserId,
    user.company_Id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};


//   Employee.delete = function (id, result) {
//     dbConn.query("DELETE FROM tbl_post_jobs WHERE id = ?", [id], function (err, res) {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//       }
//       else {
//         result(null, res);
//       }
//     });
//   };
module.exports = Employee;
