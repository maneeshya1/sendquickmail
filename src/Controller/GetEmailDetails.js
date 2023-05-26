const dbConn = require('../../config/db.config').promise();

exports.GetEmailDetails = async (req, res, next) => {
    try {
      console.log("execute....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `new_emaildetails` WHERE `UserId`= ?",
        // 'call sendquickmail_db.Get_contactemail(?)',
        [req.body.UserId]
      );
      console.log("tbl_emaildetails..............", row_a);
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "UserId matched Successfully",
          data: row_a[0],
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