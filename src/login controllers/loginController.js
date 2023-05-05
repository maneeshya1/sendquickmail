const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const dbConn = require('../../config/db.config').promise();

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const [row] = await dbConn.execute(
      // "SELECT * FROM `users` WHERE `Email`=?",
      "SELECT * FROM `invite_users` WHERE `Email`=?",
      // 'call sendquickmail_db.check_user_email_new_final(?)', 

      [req.body.Email]
    );

    console.log(req.body.Email);

    if (row.length === 0) {
      // return res.status(422).json({
      return res.json({
        message: "Invalid Email address",
        success: false,
      });
    }

    const passMatch = await bcrypt.compare(req.body.Password, row[0].Password);
    if (!passMatch) {
      // return res.status(422).json({
      return res.json({
        message: "Incorrect password",
        success: false,
      });
    }

    console.log('row[0].id................',row);
    const theToken = jwt.sign({user_id:row[0].UserId},process.env.SECRET_KEY,{ expiresIn: '10h' });


    return res.json({
      success: true,
      message: "User Login Successfully",
      data: row,
      token: theToken,
      // Data:req.body,(only use in registration page)
    });
  } catch (err) {
    next(err);
  }
};
