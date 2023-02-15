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

      'insert into tbl_campaign (`campaign_Name`,`template_Id`,`campaign_TypeId`,`company_Id`,`UserId`) values(?,?,?,?,?)',

      [
        req.body.campaign_Name,
        req.body.template_Id,
        req.body.campaign_TypeId,
        req.body.company_Id,
        req.body.UserId,
      ]);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: rows,
        message: "The campaign has been successfully inserted.",
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
      "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      [req.body.company_Id],

    );

    if (row1.length === 0) {
      return res.json({
        message: "Invalid company_Id ",
      });
    }

    const [rows1] = await dbConn.execute("UPDATE tbl_campaign SET `campaign_Name` =?,`template_Id`=?,`campaign_TypeId`=? WHERE `campaign_Id` = ?",
      [
        req.body.campaign_Name,
        req.body.template_Id,
        req.body.campaign_TypeId,
        req.body.campaign_Id,


      ]);
    if (rows1.affectedRows === 1) {
      return res.status(201).json({
        message: "The contact details has been successfully updated.",
        success: req.body,

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
