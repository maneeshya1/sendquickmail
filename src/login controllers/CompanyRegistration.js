const dbConn = require('../../config/db.config').promise();
exports.CompanyRegistration = async (req, res, next) => {

  try {
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [req.body.UserId]
    );

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid UserId",
        success: false,
      });
    }
    const [rows] = await dbConn.execute(

      'insert into company_ragistration (`companyName`, `companyEmail`,`companyURL`,`remark`,`Phone_Number`,`Number_of_Employe`,`companyLocation`, `userid`,`isactive`) values(?,?,?,?,?,?,?,?,?)',
      //"insert into company_ragistration (`company_Id`,`companyName`, `companyEmail`,`companyURL`,`remark`,`companyLocation`, `userid`,`isactive`) values(113,'c','c','c','c','c',16,0)",
      [
      
        req.body.companyName,
        req.body.companyEmail,
        req.body.companyURL,
        req.body.remark,
        req.body.Phone_Number,
        req.body.Number_of_Employe,
        req.body.companyLocation,
        req.body.UserId,
        req.body.isActive
      ]);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "The company details has been successfully inserted.",
        data: rows,
      });
    }

    return res.json({
      success: row,
      message: "UserID matched Successfully",
    });

    
  }
  catch (err) {
    next(err);
  }
};


///-------------------------------------------------

exports.CompanyDetailsEdit = async (req, res, next) => {

  try {
    const [row] = await dbConn.execute(
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [req.body.UserId]
    );

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid UserId",
      });
    }

    const [rows1] = await dbConn.execute("UPDATE company_ragistration SET `companyName` =?,`companyEmail`=?,`companyURL`=?,`remark`=?,`companyLocation`=? WHERE `company_Id` = ?",
      [
        req.body.companyName,
        req.body.companyEmail,
        req.body.companyURL,
        req.body.remark,
        req.body.companyLocation,
        req.body.company_Id,

      ]);

    if (rows1.affectedRows === 1) {
      return res.status(201).json({
        message: "The company details has been successfully updated.",
        success: true,
        data: req.body,

      });
    }

    return res.json({
      success: row,
      message: "UserID matched Successfully",
    });


  }
  catch (err) {
    next(err);
  }
};

