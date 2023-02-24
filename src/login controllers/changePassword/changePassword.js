const bcrypt = require("bcryptjs");
const dbConn = require("../../../config/db.config").promise();

exports.ChangePassword = async (req, res, next) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!req.body.oldPassword || !req.body.newPassword) {
      throw { message: "Please provide password", code: 400 };
    } else {
      //check if user exists
      // let dbUser = await getUserByUserId(user.userId);
      let [dbUser] = await dbConn.execute(
        // "SELECT * FROM `users` WHERE `Email`=?",
        "SELECT * FROM `invite_users` WHERE `UserId`=?",
        [req.body.UserId]
      );
      if (dbUser.length === 0) {
        // return res.status(422).json({
        return res.json({
          message: "Invalid UserId",
        });
      }

      if (dbUser?.length === 0) {
        // throw { message: "userId does not exists", code: 404 };
        return res.json({
          message: "Invalid UserId",
        });
      } else if (!dbUser[0]?.IsActive) {
        // throw { message: "User account is deactivated", code: 404 };
        return res.json({
          message: "User has been DeActivated",
        });
      } else if (bcrypt.compareSync(oldPassword, dbUser[0]?.Password)) {
        const hash = await bcrypt.hashSync(newPassword, 10);

        // const updatedUser = await updatePasswordById(user.userId, hash);
        // delete updatedUser["Password"];

        const [rows1] = await dbConn.execute(
          "UPDATE `invite_users` SET `Password`=?  WHERE `UserId` = ?",
          [hash, req.body.UserId]
        );
        if (rows1.affectedRows === 1) {
          return res.status(201).json({
            message: "Password has Updated successfully",
            success: true,
          });
        }
      } else {
        // throw { message: "Invalid password", code: 401 };
        return res.json({
         message: "Invalid old password",
       });
      }
    }
  } catch (err) {
    next(err);
  }
};
