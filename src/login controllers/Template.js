const dbConn = require('../../config/db.config').promise();
exports.Template = async (req, res, next) => {
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
                success: false,
            });
        }
        const [row1] = await dbConn.execute(
            // "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
            'call sendquickmail_db.GetCompanyId(?)',
            [req.body.company_Id],

        );

        if (row1.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid company_Id ",
                success: false,
            });
        }

        const [row2] = await dbConn.execute(
            "SELECT * FROM `tbl_templatetype` WHERE `templateTypeId`=?",
            // 'call sendquickmail_db.GetCompanyId(?)',
            [req.body.templateTypeId],

        );

        if (row2.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid templateTypeId ",
                success: false,
            });
        }

        const [rows] = await dbConn.execute(
            'insert into tbl_template (`template_Name`,`body`,`company_Id`,`UserId`,`templateTypeId`) values(?,?,?,?,?)',

            // 'call sendquickmail_db.CreateSegment(?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.template_Name,
                req.body.body,
                req.body.company_Id,
                req.body.UserId,
                req.body.templateTypeId,

            ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                success: true,
                message: "The template has been successfully inserted.",
                data: rows,
            });
        }

        return res.json({
            success: row, row1,row2,
            message: "UserId and CompanyId matched Successfully",
        });

    }
    catch (err) {
        next(err);
    }
};

exports.UpdateTemplate = async (req, res, next) => {

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
            // "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
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

            "UPDATE tbl_template SET `template_Name` = ?, `body` = ?,`company_Id` = ?,`UserId` = ? WHERE `template_Id` = ?",
            // 'call sendquickmail_db.Update_Segment(?,?,?,?,?,?,?,?,?,?,?,?)',

            [
                req.body.template_Name,
                req.body.body,
                req.body.company_Id,
                req.body.UserId,
                req.body.template_Id
            ]);

        console.log('message', rows)

        return res.json({
            success: true,
            message: "The Template has been successfully Updated",
            data: rows,
        });

    }
    catch (err) {
        next(err);
    }
};

exports.getAllfieldName = async (req, res, next) => {
    try {
      console.log("fieldName....");
      const [row_a] = await dbConn.execute(
        "SELECT `fieldName` FROM `tbl_template_field`",
        // 'call sendquickmail_db.Get_Allscheduler()',
        []
      );
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "List of All fieldName",
          data: row_a,
        });
      } else {
        return res.json({
          message: "No data found",
        });
      }
    } catch (err) {
      console.log("err...", err);
      next(err);
    }
  };
