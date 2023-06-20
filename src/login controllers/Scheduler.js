const dbConn = require("../../config/db.config").promise();

exports.getAllScheduler = async (req, res, next) => {
  try {
    console.log("getAllScheduler....");
    const [row_a] = await dbConn.execute(
      // "SELECT * FROM `tbl_new_scheduler`",
      'call sendquickmail_db.Get_Allscheduler()',
      []
    );
    if (row_a.length > 0) {
      return res.json({
        success: "true",
        message: "List of All Schedules",
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

exports.getScheduler = async (req, res, next) => {
  try {
    console.log("execute....");
    const [row_a] = await dbConn.execute(
      // "SELECT * FROM `tbl_new_scheduler` WHERE `scheduler_Id`= ?",
      'call sendquickmail_db.Get_schedulerById(?)',
      [req.body.UserId]
    );
    console.log("tbl_new_scheduler..............", row_a);
    if (row_a.length > 0) {
      return res.json({
        success: "true",
        message: "UserId  matched Successfully",
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

exports.addScheduler = async (req, resp, next) => {
  let reqdata = {
    company_Id: req.body.company_Id,
    UserId: req.body.UserId,
    senderId: req.body.senderId,
    subject: req.body.subject,
    campaign_Id: req.body.campaign_Id,
    schedulerTime: req.body.schedulerTime,
    status: req.body.status,
  };
  try {
    // find user id
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [reqdata?.UserId]
    );
    if (row.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid UserId",
      });
    }

    ///// find company id
    const [row_1] = await dbConn.execute(
      // "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      'call sendquickmail_db.GetCompanyId(?)',
      [reqdata?.company_Id]
    );
    if (row_1.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid company Id ",
      });
    }
    ///// find campaign id
    const [row_2] = await dbConn.execute(
      // "SELECT * FROM `tbl_campaign` WHERE `campaign_Id`=?",
      'call sendquickmail_db.GetbyCampaign_Id(?)',
      [reqdata?.campaign_Id]
    );
    if (row_2.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid campaign Id ",
      });
    }
    ///// find sender id
    const [row_3] = await dbConn.execute(
      // "SELECT * FROM `tblsender_emails_details` WHERE `sender_Id`=?",
      'call sendquickmail_db.GetbySender_Id(?)',
      [reqdata?.senderId]
    );
    if (row_3.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid sender Id ",
      });
    }

    const [rows_add] = await dbConn.execute(
      // "Insert into tbl_new_scheduler (company_Id, UserId, senderId, subject, campaign_Id, schedulerTime, status) values(?,?,?,?,?,?,?)",
      'call sendquickmail_db.Create_scheduler(?,?,?,?,?,?,?)',
      [
        reqdata?.company_Id,
        reqdata?.UserId,
        reqdata?.senderId,
        reqdata?.subject,
        reqdata?.campaign_Id,
        reqdata?.schedulerTime,
        reqdata?.status,
      ]
    );
    console.log("rows_add........", rows_add);
    if (rows_add.affectedRows === 1) {
      return resp.status(201).json({
        success: rows_add,
        message: "The schedule successfully created.",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateScheduler = async (req, resp, next) => {
  let reqdata = {
    scheduler_Id: req.body.scheduler_Id,
    company_Id: req.body.company_Id,
    UserId: req.body.UserId,
    senderId: req.body.senderId,
    subject: req.body.subject,
    campaign_Id: req.body.campaign_Id,
    schedulerTime: req.body.schedulerTime,
    status: req.body.status,
    createdBy: req.body.createdBy,
  };
  let getSchedule = {};
  let rows_update=[];
  try {
    // find user id
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `UserId`=?",
      [reqdata?.UserId]
    );
    if (row.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid UserId",
      });
    }
    ///// find company id
    const [row_1] = await dbConn.execute(
      // "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      'call sendquickmail_db.GetCompanyId(?)',
      [reqdata?.company_Id]
    );
    if (row_1.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid company Id ",
      });
    }
    ///// find campaign id
    const [row_2] = await dbConn.execute(
      // "SELECT * FROM `tbl_campaign` WHERE `campaign_Id`=?",
      'call sendquickmail_db.GetbyCampaign_Id(?)',
      [reqdata?.campaign_Id]
    );
    if (row_2.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid campaign Id ",
      });
    }
    ///// find sender id
    const [row_3] = await dbConn.execute(
      // "SELECT * FROM `tblsender_emails_details` WHERE `sender_Id`=?",
      'call sendquickmail_db.GetbySender_Id(?)',
      [reqdata?.senderId]
    );
    if (row_3.length === 0) {
      // return resp.status(422).json({
      return resp.json({
        message: "Invalid sender Id ",
      });
    }
    const [row_a] = await dbConn.execute(
      // "SELECT * FROM `tbl_new_scheduler` WHERE `scheduler_Id`= ?",
      'call sendquickmail_db.Get_schedulerById(?)',
      [reqdata?.scheduler_Id]
    );
    console.log("row_a.....", row_a);
    if (row_a.length == 0) {
      return resp.json({
        message: "Invalid scheduler Id ",
      });
    } else {
      getSchedule = { ...row_a[0] };
    console.log('getSchedule.......',getSchedule);
    // let query =
    //   "UPDATE `tbl_new_scheduler` SET `company_Id`=?, `UserId`=?, `senderId`=?, `subject`=?, `campaign_Id`=?, `schedulerTime`=?, `status`=?, `createdBy`=?  WHERE (`scheduler_Id` = '?')";
    
    // //  const rows_update = []; // use for testing
    [rows_update] = await dbConn.execute(
      // "UPDATE `tbl_new_scheduler` SET `company_Id`=?, `UserId`=?, `senderId`=?, `subject`=?, `campaign_Id`=?, `schedulerTime`=?, `status`=?, `createdBy`=?  WHERE `scheduler_Id` = ?",
      'call sendquickmail_db.Update_scheduler(?,?,?,?,?,?,?,?,?)',
      // query,
      [
        reqdata?.company_Id || getSchedule?.company_Id,
        reqdata?.UserId || getSchedule?.UserId,
        reqdata?.senderId || getSchedule?.senderId,
        reqdata?.subject || getSchedule?.subject,
        reqdata?.campaign_Id || getSchedule?.campaign_Id,
        reqdata?.schedulerTime || getSchedule?.schedulerTime,
        reqdata?.status || getSchedule?.status,
        reqdata?.createdBy || getSchedule?.createdBy,
        reqdata?.scheduler_Id || getSchedule?.scheduler_Id,

        // reqdata?.company_Id ,
        // reqdata?.UserId ,
        // reqdata?.senderId, 
        // reqdata?.subject ,
        // reqdata?.campaign_Id ,
        // reqdata?.schedulerTime ,
        // reqdata?.status ,
        // reqdata?.createdBy ,
        // reqdata?.scheduler_Id,
      ]
    );

    console.log("rows_update........", rows_update);
    }
    if (rows_update.affectedRows === 1) {
      return resp.status(201).json({
        success: rows_update,
        message: "The user has been successfully inserted.",
      });
    } else {
      return resp.status(403).json({
        message: "Unable to update detaild",
      });
    }
  } catch (error) {
    next(error);
  }
};
