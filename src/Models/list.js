'use strict';
var dbConn = require('../../config/db.config');
//Employee object create
var Employee = function (user) {
  this.list_Name = user.list_Name;
  this.UserId = user.UserId;
  this.company_Id = user.company_Id
  this.isActive = user.isActive
  //   this.budget = user.budget
  //   this.description = user.description
  // this.Action     = user.Action
  // this.created_at     = new Date();
  // this.updated_at     = new Date();
};




  Employee.findByUserID = function (id, result) {
    dbConn.query("Select * from tbl_list where UserId = ? ", id, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  };


module.exports = Employee;
