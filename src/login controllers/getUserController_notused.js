const jwt = require('jsonwebtoken');
const dbConn = require('../../config/db.config').promise();
let VerifyToken = require('../middleware/auth');

exports.getUser = async (req, res, next) => {
    try {
       const User= VerifyToken(req,res);
       console.log("User......",User);
       if(!User?.userID) throw {code:401,message :'Unauthorized access'}
        
            const [row] = await dbConn.execute(
                'SELECT `UserId`,`Name`,`Username`,`Email` FROM `invite_users` WHERE `UserId`=?',
                [User?.userID]
            );
            console.log("row.............",row[0]);
            if (row?.length > 0) {
                return res.json({
                    user: row[0]
                });
            }

            res.json({
                message: "No user found"
            });
    }
    catch (err) {
        next(err);
    }
}






// const jwt = require('jsonwebtoken');
// const dbConn = require('./../../config/db.config').promise();

// exports.getUser = async (req,res,next) => {

//     try{

//         if(
//             !req.headers.authorization ||
//             !req.headers.authorization.startsWith('Bearer') ||
//             !req.headers.authorization.split(' ')[1]
//         ){
//             return res.status(422).json({
//                 message: "Please provide the token",
//             });
//         }

//         const theToken = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(theToken, process.env.SECRET_KEY);

//         const [row] = await dbConn.execute(
           
//             // "SELECT `InviteUserId`,`FirstName`,`LastName`,`Email`,`createdDate` ,`createdBy` FROM `users` WHERE `InviteUserId`=?",
//             "SELECT `InviteUserId`,`Name`,`Username`,`Email` FROM `invite_users` WHERE `InviteUserId`=?",
//             [decoded.InviteUserId]
//         );
//         if (decoded) {
//             const [row] = await conn.execute(
//                 "SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?",
//                 [decoded.id]
//             );
//         if(row.length > 0){
//             return res.json({
//                 user:row[0]
//             });
//         }

//         res.json({
//             message:"No user found"
//         });
//     }
//     else throw{ data:'something went wrong'}
//     }
//     catch(err){
//         next(err);
//     }
// }