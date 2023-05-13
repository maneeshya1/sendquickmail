const dbConn = require('./../../config/db.config').promise();


exports.GetContactDetails = async (req, res, next) => {
        try {
          console.log("execute....");
          const [row_a] = await dbConn.execute(
            // "SELECT * FROM `tbl_contactdetails` WHERE `company_Id`= ?",
            'call sendquickmail_db.GetcontactDetails(?)',
            [req.body.company_Id]
          );
          console.log("tbl_contactdetails..............", row_a);
          if (row_a.length > 0) {
            return res.json({
              success: "true",
              message: "company Id matched Successfully",
              data: row_a[0],
            });
          } else {
            return res.json({
              status: 404,
              message: "Invalid company Id ",
            });
          }
        } catch (err) {
          console.log("err...", err);
          next(err);
        }
      };

      exports.Get_TodayContactDetails = async (req, res, next) => {
        try {
          console.log("execute....");
          const [row_a] = await dbConn.execute(
            // "SELECT * FROM `tbl_contactdetails` WHERE `created_Date`= ?",
            'call sendquickmail_db.Get_TodayContactDetails(?)',
            [req.body.created_Date]
          );
          console.log("tbl_contactdetails..............", row_a);
          if (row_a.length > 0) {
            return res.json({
              success: "true",
              message: "created_Date matched Successfully",
              data: row_a,
              //////----------------------------------------
            });
          } else {
            return res.json({
              status: 404,
              message: "Invalid created_Date ",
            });
          }
        } catch (err) {
          console.log("err...", err);
          next(err);
        }
      };