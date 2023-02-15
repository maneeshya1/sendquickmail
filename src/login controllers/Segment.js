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

      'insert into tbl_segment (`segmentName`,`criteria`,`contactfieldType`,`FieldfindBy`,`Is_And`,`Is_Or`,`company_Id`,`UserId`,`IsActive`) values(?,?,?,?,?,?,?,?,?)',

      [
       
        req.body.segmentName,
        req.body.criteria, 
        req.body.contactfieldType,
        req.body.FieldfindBy,
        req.body.Is_And, 
        req.body.Is_Or, 
        req.body.company_Id,
        req.body.UserId,
        req.body.IsActive,

      ]);


    if (rows.affectedRows === 1) {
      return res.status(201).json({
        success: rows,
        message: "The Segment has been successfully inserted.",
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
      "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
      [req.body.company_Id],

    );

    if (row1.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid company_Id ",
      });
    }

    const [rows] = await dbConn.execute("UPDATE tbl_segment SET `segmentName` = ?, `criteria` = ?, `contactfieldType` = ?, `FieldfindBy` = ?, `Is_And` = ?, `Is_Or` = ?, `IsActive` = ? WHERE `segment_Id` = ?",
      [
        req.body.segmentName,
        req.body.criteria, 
        req.body.contactfieldType,
        req.body.FieldfindBy,
        req.body.Is_And, 
        req.body.Is_Or, 
        req.body.IsActive,
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
      success: rows,
      message: "The Segment has been successfully Updated",
    });

  }
  catch (err) {
    next(err);
  }
};