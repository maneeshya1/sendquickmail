const dbConn = require('../../config/db.config').promise();
exports.Campaign = async (req, res, next) => {

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
      'call sendquickmail_db.GetCompanyId(?)',
      [req.body.company_Id],

    );

    if (row1.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid company_Id ",
      });
    }

    const [rows] = await dbConn.execute(

      // 'insert into tbl_campaign (`campaign_Name`,`template_Id`,`campaign_TypeId`,`company_Id`,`UserId`) values(?,?,?,?,?)',

      'call sendquickmail_db.Create_campaign(?,?,?, ?,?)',
      [
        req.body.campaign_Name,
        req.body.template_Id,
        req.body.campaign_TypeId,
        req.body.company_Id,
        req.body.UserId,
      ]);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "The campaign has been successfully inserted.",
        data: rows,
      });
    }

    return res.json({
      success: row, row1,
      message: "UserId and CompanyId matched Successfully",
    });

  }
  catch (err) {
    next(err);
  }
};

///---------------------------------------------------------------------------------

exports.CampaignDetailsEdit = async (req, res, next) => {

  try {

    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [req.body.UserId],
    );

    if (row.length === 0) {
      return res.json({
        message: "Invalid UserId",
      });
    }
    const [row1] = await dbConn.execute(
      // "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      
      'call sendquickmail_db.GetCompanyId(?)',
      [req.body.company_Id],

    );

    if (row1.length === 0) {
      return res.json({
        message: "Invalid company_Id ",
      });
    }

    const [rows1] = await dbConn.execute(
      // "UPDATE tbl_campaign SET `campaign_Name` =?,`template_Id`=?,`campaign_TypeId`=? WHERE `campaign_Id` = ?",
      'call sendquickmail_db.Update_campaign(?,?,?,?)',
      [
        req.body.campaign_Name,
        req.body.template_Id,
        req.body.campaign_TypeId,
        req.body.campaign_Id,


      ]);
    if (rows1.affectedRows === 1) {
      return res.status(201).json({
        message: "The campaign details has been successfully updated.",
        success: true,
        data: req.body,

      });
    }

    return res.json({
      success: row, row1,
      message: "UserId and CompanyId matched Successfully",
    });

  }
  catch (err) {
    next(err);
  }
};

exports.GetCampaignUserId = async (req, res, next) => {
  try {
    console.log("execute....");
    const [row_a] = await dbConn.execute(
      "SELECT * FROM `tbl_campaign` WHERE `UserId`= ?",
      // 'call sendquickmail_db.Get_contactemail(?)',
      [req.body.UserId]
    );
    console.log("UserId..............", row_a);
    if (row_a.length > 0) {
      return res.json({
        success: "true",
        message: "UserId matched Successfully",
        data: row_a,
      });
    } else {
      return res.json({
        status: 404,
        message: "Invalid UserId ",
      });
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};

