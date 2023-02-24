const dbConn = require("../../config/db.config").promise();
exports.ContactDetails = async (req, res, next) => {
  try {
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",

      [req.body.company_Id]
    );

    if (row.length === 0) {
      return res.json({
        message: "Invalid company_Id",
      });
    }
    const [rows] = await dbConn.execute(
      "insert into tbl_contactdetails (`firstName`,`lastName`,`contact_Email`,`user_Details`,`file_UploadId`,`IsActive`,`list_Id`,`company_Id`,`contact_Number`) values(?,?,?,?,?,?,?,?,?)",
      [
        req.body.firstName,
        req.body.lastName,
        req.body.contact_Email,
        req.body.user_Details,
        req.body.file_UploadId,
        req.body.IsActive,
        req.body.list_Id,
        req.body.company_Id,
        req.body.contact_Number,
      ]
    );
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The contact details has been successfully inserted.",
        success: true,
        data: req.body,
      });
    }

    return res.json({
      success: row,
      message: "companyId matched Successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.ContactDetailsEdit = async (req, res, next) => {
  try {
    const [row] = await dbConn.execute(
      "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      [req.body.company_Id]
    );

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid company_Id",
      });
    }
    const [rows1] = await dbConn.execute(
      "UPDATE tbl_contactdetails SET `firstName` =?,`company_Id`=?,`lastName`=?,`contact_Email`=?,`user_Details`=?,`file_UploadId`=?,`IsActive`=?,`list_Id`=?,`contact_Number`=? WHERE `contact_id` = ?",
      [
        req.body.firstName,
        req.body.company_Id,
        req.body.lastName,
        req.body.contact_Email,
        req.body.user_Details,
        req.body.file_UploadId,
        req.body.IsActive,
        req.body.list_Id,
        req.body.contact_Number,
        req.body.contact_id,
      ]
    );
    if (rows1.affectedRows === 1) {
      return res.status(201).json({
        message: "The contact details has been successfully updated.",
        success: true,
        data: req.body,
      });
    }
    return res.json({
      success: row,
      message: "companyId matched Successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.ContactUnSubscribe = async (req, res, next) => {
  console.log("contact_Email.......", req?.body?.contact_Email);
  try {
    const [row] = await dbConn.execute(
      // "SELECT * FROM `tbl_contactdetails` WHERE `contact_Email`=?",
      "SELECT * FROM `tbl_contactdetails`  WHERE `contact_Email`= ?",
      // ['akas@jf.ci']
      [req?.body?.contact_Email]
    );
    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid contact_Email",
      });
    }
    const [rows1] = await dbConn.execute(
      "UPDATE tbl_contactdetails SET `IsActive`=?  WHERE `contact_Email` = ?",
      [req.body.IsActive, req.body.contact_Email]
    );
    if (rows1.affectedRows === 1) {
      return res.status(201).json({
        message: "The contact has been unsubscribe.",
        success: true,
      });
    }
    return res.json({
      success: row,
      message: "contact_Email matched Successfully",
    });
  } catch (err) {
    next(err);
  }
};
