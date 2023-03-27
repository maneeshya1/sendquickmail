const dbConn = require('../../config/db.config').promise();
exports.Fileupload = async (req, res, next) => {

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

      'insert into tbl_fileupload (`company_Id`,`UserId`,`filename`,`filesize`,`fileExtension`,`totalrecords`,`succesrecords`,`failurerecords`) values(?,?,?,?,?,?,?,?)',

      [
        req.body.company_Id,
        req.body.UserId,
        req.body.filename,         
        req.body.filesize,
        req.body.fileExtension,
        req.body.totalrecords,
        req.body.succesrecords,
        req.body.failurerecords, 

      ]);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: rows,
        message: "The fileuploaded has been successfully inserted.",
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
