const dbConn = require("../../config/db.config").promise();
exports.ContactDetails = async (req, res, next) => {
  try {

    const [rowFindUser] = await dbConn.execute('SELECT * FROM tbl_contactdetails WHERE contact_Email = ?', [req.body.contact_Email])
    console.log('.................................', rowFindUser);
    if (rowFindUser?.length > 0) {
      return res.json({
        message: "Email is already exists",
        success: false,
      });
    }

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

    //
    const [rows] = await dbConn.execute(
      // "insert into tbl_contactdetails (`firstName`,`lastName`,`contact_Email`,`user_Details`,`file_UploadId`,`IsActive`,`list_Id`,`company_Id`,`contact_Number`) values(?,?,?,?,?,?,?,?,?)",
      'call sendquickmail_db.Contactdetails(?,?,?,?,?,?,?,?,?)',
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
      // "UPDATE tbl_contactdetails SET `firstName` =?,`company_Id`=?,`lastName`=?,`contact_Email`=?,`user_Details`=?,`file_UploadId`=?,`IsActive`=?,`list_Id`=?,`contact_Number`=? WHERE `contact_id` = ?",
      'call sendquickmail_db.Update_ContactDetails(?,?,?,?,?,?,?,?,?,?)',
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
    if (!req?.body?.company_Id || !req?.body?.contact_Email) {
      return res.json({
        message: "Contact Email and company Id both required",
      });
    }
    // const [isCompanyFound] = await dbConn.execute(
    //   "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
    //   [req.body.company_Id]
    // );

    // if (isCompanyFound.length === 0) {
    //   // return res.status(422).json({
    //   return res.json({
    //     message: "Invalid company_Id",
    //   });
    // }
    const [row] = await dbConn.execute(
      // "SELECT * FROM `tbl_contactdetails` WHERE `contact_Email`=?",
      "SELECT * FROM `tbl_contactdetails`  WHERE `company_Id`= ? and contact_Email= ?",
      // ['akas@jf.ci']
      [req?.body?.company_Id, req?.body?.contact_Email]
    );
    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid contact_Email",
      });
    }

    console.log('....................', req?.body?.isActive);
    let checkValue = '';
    if (typeof req?.body?.isActive === 'boolean') {
      if (req?.body?.isActive == true) {
        // checkValue = '1';
        return res.json({
          message: "Unable to Process",
        });
      }
      else checkValue = '0';
      console.log("checkValue_...", checkValue);
    } else {
      throw { message: 'isActive should be boolena' }
    }

    console.log('jbb bib jbi000000000', typeof checkValue);
    const [rows1] = await dbConn.execute(
      // "UPDATE tbl_contactdetails SET `IsActive`=?  WHERE `contact_Email` = ?",
      'call sendquickmail_db.Unsubscribe(?,?)',
      [String(checkValue), req.body.contact_Email]
      // ['0', req.body.contact_Email]
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
