const dbConn = require("../../config/db.config").promise();

exports.getUserCompanyDataByUserId = async (req, res, next) => {
  try {
    let reqBody = {
      UserId: req?.body?.UserId,
    };
    console.log("getAllScheduler....");
    const [rowUser] = await dbConn.execute(
      "SELECT * FROM `invite_users` WHERE UserId = ?",
      [reqBody?.UserId]
    );
    console.log("rowUser....", rowUser);
    if (rowUser?.length == 0) {
      return res.json({
        message: "User not found",
      });
    } else {
      const [rowUserCompany] = await dbConn.execute(
        "SELECT * FROM sendquickmail_db.company_ragistration WHERE UserId = ? ",
        [reqBody?.UserId]
      );
      console.log("rowUser....", rowUserCompany);
      if (rowUserCompany?.length == 0) {
        return res.json({
          message: "company data not found",
        });
      } else {
        let newData = {
          ...rowUser[0],
          companyDetails: rowUserCompany,
        };
        return res.json({
          success: "true",
          message: "List of All Companies registered with user",
          data: newData,
        });
      }
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};
