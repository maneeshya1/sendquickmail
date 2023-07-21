const dbConn = require('../../config/db.config').promise();
exports.NewCampaign = async (req, res, next) => {

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
            // 'call sendquickmail_db.GetCompanyId(?)',
            [req.body.company_Id],

        );

        if (row1.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid company_Id ",
            });
        }

        const [row2] = await dbConn.execute(
            "SELECT * FROM `tbl_template` WHERE `template_Id`=?",
            // 'call sendquickmail_db.Get_template(?)',
            [req.body.template_Id],

        );

        if (row2.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid template_Id ",
            });
        }

        const [rows] = await dbConn.execute(

            // 'insert into tbl_createcampaign (`ToName`,`sentTo`,`ToCC`,`ToBCC`,`Subject`,`template_Id`,`senderEmail`,`senderPassword`,`Date`,`Time`,`Timezone`,`company_Id`,`UserId`) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            'call sendquickmail_db.Newcreatecampaign(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',

            [
                req.body.ToName,
                req.body.sentTo,
                req.body.ToCC,
                req.body.ToBCC,
                req.body.Subject,
                req.body.template_Id,
                req.body.senderEmail,
                req.body.senderPassword,
                req.body.body,
                req.body.Date,
                req.body.Time,
                req.body.Timezone,
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
            success: row, row1, row2,
            message: "UserId , CompanyId and templateId matched Successfully",
        });

    }
    catch (err) {
        next(err);
    }
};


exports.UpdateCampaign = async (req, res, next) => {
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
            // 'call sendquickmail_db.GetCompanyId(?)',
            [req.body.company_Id],

        );

        if (row1.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid company_Id ",
            });
        }

        const [row2] = await dbConn.execute(
            "SELECT * FROM `tbl_template` WHERE `template_Id`=?",
            //   'call sendquickmail_db.GetCompanyId(?)',
            [req.body.template_Id],

        );

        if (row2.length === 0) {
            // return res.status(422).json({
            return res.json({
                message: "Invalid template_Id ",
            });
        }

        const [rows] = await dbConn.execute(

            // "UPDATE tbl_createcampaign SET `ToName` = ?, `sentTo` = ?, `ToCC` = ?, `ToBCC` = ?, `Subject` = ?, `template_Id` = ?, `senderEmail` = ?,`senderPassword`= ?, `Date` = ? ,`Time` = ?,`Timezone` = ?,`company_Id` = ?,`UserId` = ? WHERE `id` = ?",
            'call sendquickmail_db.Update_NewCampaign(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',

            [
                req.body.ToName,
                req.body.sentTo,
                req.body.ToCC,
                req.body.ToBCC,
                req.body.Subject,
                req.body.template_Id,
                req.body.senderEmail,
                req.body.senderPassword,
                req.body.Date,
                req.body.Time,
                req.body.Timezone,
                req.body.company_Id,
                req.body.UserId,
                req.body.campaign_Id,
            ]);


        console.log('message', rows)


        return res.json({
            success: true,
            message: "The Camapaign has been successfully Updated",
            data: rows,
        });

    }
    catch (err) {
        next(err);
    }
};


exports.getAllCampaign = async (req, res, next) => {
    try {
      console.log("getAllCampaign....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `tbl_createcampaign`",
        []
      );
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "List of All Campaign",
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

  exports.GetCampaignByUserId = async (req, res, next) => {
    try {
      console.log("execute....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `tbl_createcampaign` WHERE `UserId`= ?",
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
