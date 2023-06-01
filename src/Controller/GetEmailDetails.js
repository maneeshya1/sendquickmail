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


  exports.GetStateDetails = async (req, res, next) => {
    try {
      console.log("execute....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `tbl_states` WHERE `country_id`= ?",
        // 'call sendquickmail_db.Get_contactemail(?)',
        [req.body.country_id]
      );
      console.log("tbl_states..............", row_a);
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "country_id matched Successfully",
          data: row_a,
        });
      } else {
        return res.json({
          status: 404,
          message: "Invalid country_id ",
        });
      }
    } catch (err) {
      console.log("err...", err);
      next(err);
    }
  };

  exports.getAllCountry = async (req, res, next) => {
    try {
      console.log("tbl_countries....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `tbl_countries`",
        // 'call sendquickmail_db.Get_Allscheduler()',
        []
      );
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "List of All countries",
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

  exports.GetCityDetails = async (req, res, next) => {
    try {
      console.log("execute....");
      const [row_a] = await dbConn.execute(
        "SELECT * FROM `tbl_cities` WHERE `state_id`= ?",
        // 'call sendquickmail_db.Get_contactemail(?)',
        [req.body.state_id]
      );
      console.log("tbl_cities..............", row_a);
      if (row_a.length > 0) {
        return res.json({
          success: "true",
          message: "state_id matched Successfully",
          data: row_a,
        });
      } else {
        return res.json({
          status: 404,
          message: "Invalid state_id ",
        });
      }
    } catch (err) {
      console.log("err...", err);
      next(err);
    }
  };