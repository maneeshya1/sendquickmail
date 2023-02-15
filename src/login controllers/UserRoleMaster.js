const dbConn = require('../../config/db.config').promise();
exports.UserRoles = async (req, res, next) => {

    try {
      
      const [rows1] =await dbConn.execute(
      'insert into tbl_userrolemaster (`RoleName`) values(?)',

        [ 
          req.body.RoleName          
        ]);
       if (rows1.affectedRows === 1) {
        return res.status(201).json({
           message: "The user role has been successfully inserted.",
           success: req.body,
          
       });
       }
      
     
    }
    catch (err) {
      next(err);
    }
  };