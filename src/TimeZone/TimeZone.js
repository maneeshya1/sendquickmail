const dbConn = require("../../config/db.config").promise();

exports.getTimeZone = async (req, resp, next) => {
  try {
    const [row_a] = await dbConn.execute(
      // "SELECT * FROM `tbl_timezone_allcountries`",
      'call sendquickmail_db.GetAll_Timezone()',
      []
    );
    // console.log("row_a........", row_a);
    if (row_a.length > 0) {
      return resp.json({
        success: "true",
        message: "List of all timeZone",
        data: row_a[0],
      });
    } else {
      return resp.json({
        message: "No data found",
      });
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};
exports.getTimeZoneById = async (req, resp, next) => {
  try {
    let reqdata = { ...req?.body };
    const [row] = await dbConn.execute(
      "SELECT * FROM `tbl_timezone_allcountries` WHERE `Id`=?",
      [reqdata?.Id]
    );
    if (row.length === 0) {
      return resp.json({
        message: "Invalid timeZone",
      });
    } else {
      return resp.json({
        success: "true",
        message: "timeZone Id matched Successfully",
        data: row[0],
      });
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};

exports.addTimeZone = async (req, resp, next) => {
  try {
    let reqBody = {
      timeZone: req?.body?.timeZone,
      isActive: req?.body?.isActive ? 1 : 0,
    };
    const [rows_add] = await dbConn.execute(
      "Insert into tbl_timezone_allcountries (timeZone, isActive) values(?,?)",
      [reqBody?.timeZone, reqBody?.isActive]
    );
    if (rows_add.affectedRows === 1) {
      return resp.status(201).json({
        success: rows_add?.message,
        message: "The timeZone has been successfully inserted.",
      });
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};

exports.updateTimeZone = async (req, resp, next) => {
  try {
    let reqdata = {
      Id: req?.body?.Id,
      timeZone: req?.body?.timeZone,
      isActive: req?.body?.isActive ? 1 : 0,
    };
    let getTimeZone = {};
    let rows_update = [];

    const [row] = await dbConn.execute(
      "SELECT * FROM `tbl_timezone_allcountries` WHERE `Id`=?",
      [reqdata?.Id]
    );
    console.log("row...", row[0]);
    if (row.length === 0) {
      return resp.json({
        message: "Invalid timeZone Id",
      });
    }
    getTimeZone = { ...row[0] };

    [rows_update] = await dbConn.execute(
      "UPDATE `tbl_timezone_allcountries` SET `timeZone`=?, `isActive`=?  WHERE `Id` = ?",
      [
        reqdata?.timeZone || getTimeZone?.timeZone,
        reqdata?.isActive || getTimeZone?.isActive,
        reqdata?.Id || getTimeZone?.Id,
      ]
    );

    console.log("rows_update........", rows_update);

    if (rows_update.affectedRows === 1) {
      return resp.status(201).json({
        success: rows_update,
        message: "The timeZone has been successfully updated",
      });
    } else {
      return resp.status(403).json({
        message: "Unable to update detaild",
      });
    }
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};

exports.addList_of_TimeZone = async (req, resp, next) => {
  try {
    const reqBody = req?.body?.list;
    let rows_add = [];
    console.log("len.......", reqBody?.length);

    while (i < reqBody?.length) {
      let newReqBody = {
        timeZone: reqBody[i]?.timeZone,
        isActive: reqBody[i]?.isActive ? 1 : 0,
      };
      // console.log("index_data", newReqBody?.timeZone, newReqBody?.isActive);
      [rows_add] = await dbConn
        .execute(
          "Insert into tbl_timezone_allcountries (timeZone, isActive) values(?,?)",
          [newReqBody[i]?.timeZone, newReqBody[i]?.isActive]
        )
        .then((e) => {
          i++;
        })
        .catch((e) => {
          throw { message: "Unable to continue insertion process" };
        });

      if (rows_add.affectedRows === 1) {
        console.log("rows_add........index", [i]);
      }
    }
    return resp.status(201).json({
      success: true,
      message: "All The timeZone has been successfully inserted.",
    });
  } catch (err) {
    console.log("err...", err);
    next(err);
  }
};
