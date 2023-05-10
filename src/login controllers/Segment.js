const dbConn = require('../../config/db.config').promise();
exports.Segment = async (req, res, next) => {

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
    
    const [rows] = await dbConn.execute(
     

      // 'insert into tbl_segment (`segmentName`,`criteria`,`contactfieldType`,`FieldfindBy`,`Is_And`,`Is_Or`,`contains`,`segment_users`,`company_Id`,`UserId`,`IsActive`) values(?,?,?,?,?,?,?,?,?,?,?)',

      'call sendquickmail_db.CreateSegment(?,?,?,?,?,?,?,?,?,?,?)',
      [
        req.body.segmentName,
        req.body.criteria,
        req.body.contactfieldType,
        req.body.FieldfindBy,
        req.body.Is_And,
        req.body.Is_Or,
        req.body.contains,
        req.body.segment_users,
        req.body.company_Id,
        req.body.UserId,
        req.body.IsActive,

      ]);


    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "The Segment has been successfully inserted.",
        data: rows,
      });
    }

    return res.json({
      success: row,row1,
      message: "UserId and CompanyId matched Successfully",
    });

   
    
  }
  catch (err) {
    next(err);
  }
};


exports.UpdateSegment = async (req, res, next) => {

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
      
      // "UPDATE tbl_segment SET `segmentName` = ?, `criteria` = ?, `contactfieldType` = ?, `FieldfindBy` = ?, `Is_And` = ?, `Is_Or` = ?, `contains` = ?,`segment_users`= ?, `IsActive` = ? WHERE `segment_Id` = ?",
      'call sendquickmail_db.Update_Segment(?,?,?,?,?,?,?,?,?,?,?,?)',

      [
        req.body.segmentName,
        req.body.criteria, 
        req.body.contactfieldType,
        req.body.FieldfindBy,
        req.body.Is_And, 
        req.body.Is_Or,
        req.body.contains,
        req.body.segment_users, 
        req.body.IsActive,
        req.body.UserId,
        req.body.company_Id,
        req.body.segment_Id
      ]);

    console.log('message', rows)


    // if (rows.affectedRows === 1) {
    //   return res.status(201).json({
    //     success: rows,
    //     message: "The Segment has been successfully Updated",
    //   });
    // }

    return res.json({
      success: true,
      message: "The Segment has been successfully Updated",
      data: rows,
    });

  }
  catch (err) {
    next(err);
  }
};