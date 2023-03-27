const dbConn = require('../../config/db.config').promise();
exports.List = async (req, res, next) => {

  try {
    
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [req.body.UserId],


    );

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid UserId",
      });
    }
    const [row1] = await dbConn.execute(
      "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      [req.body.company_Id],

    );

    if (row1.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid company_Id ",
      });
    }
    
    const [rows] = await dbConn.execute(

      'insert into tbl_list (`list_Id`,`list_Name`,`UserId`,`company_Id`,`IsActive`) values(?,?,?,?,?)',

      [
        req.body.list_Id,
        req.body.list_Name,
        req.body.UserId,         
        req.body.company_Id,
        req.body.IsActive,
      ]);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: rows,
        message: "The List has been successfully inserted.",
      });
    }

    return res.json({
      success: row,row1,
      message: "UserId and CompanyId matched Successfully",
    });

  }
  catch (err) {
    next(err);
  }
};
