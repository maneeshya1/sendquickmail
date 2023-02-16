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
        succes: false,
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
          succes: false,
          message: "company data not found",
        });
      } else {
        let newData = {
          ...rowUser[0],
          companyDetails: rowUserCompany,
        };
        return res.json({
          success: true,
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

exports.updateUserByUserId = async (req, resp, next) => {
  // UserId,
  // Name,
  // Username,
  // Email,
  // UserPhoneNo,
  // Designation,
  // UserIsActive,
  // companyName,
  // companyEmail,
  // companyURL,
  // remark,
  // companyLocation,
  // CompanyIsActive,
  // company_Id,
  try {
    let reqBody = { ...req?.body };
    let getUserInfo = {};
    let getCompanyrInfo = {};
    let rowUserUpdate = [];
    let rowCompanyUpdate = [];
    let CompanyIsActive;
    let UserIsActive;
    console.log("reqBody....", reqBody);
    if (reqBody?.UserId && reqBody?.company_Id) {
      const [rowUser] = await dbConn.execute(
        "SELECT * FROM `invite_users` WHERE `UserId`=?",
        [reqBody?.UserId]
      );
      // console.log("rowUser...", rowUser[0]);
      if (rowUser.length === 0) {
        return resp.json({
          success: false,
          message: "Invalid UserId",
        });
      }
      getUserInfo = { ...rowUser[0] };

      const [rowCompany] = await dbConn.execute(
        "SELECT * FROM `company_ragistration` WHERE `company_Id`=?",
        [reqBody?.company_Id]
      );
      console.log("rowCompany...", rowCompany[0]);
      if (rowCompany.length === 0) {
        return resp.json({
          success: false,
          message: "Invalid company ID",
        });
      }
      getCompanyrInfo = { ...rowCompany[0] };

      //////////.............. checking UserIsActive has a boolean value or it is undefined
      if (typeof reqBody?.UserIsActive == "boolean") {
        UserIsActive = reqBody?.UserIsActive ? 1 : 0;
      } else if (typeof reqBody?.UserIsActive == undefined) {
        UserIsActive = getUserInfo?.IsActive;
      }
      console.log("getUserInfo.......", getUserInfo?.IsActive);
      console.log("UserIsActive....", UserIsActive);
      [rowUserUpdate] = await dbConn.execute(
        "UPDATE `invite_users` SET `Name`=?, `Username`=?, `Email`=?, `UserPhoneNo`=?, `Designation`=?, `Company_Id`=? WHERE `UserId` = ?",
        [
          reqBody?.Name || getUserInfo?.Name,
          reqBody?.Username || getUserInfo?.Username,
          reqBody?.Email || getUserInfo?.Email,
          reqBody?.UserPhoneNo || getUserInfo?.UserPhoneNo,
          reqBody?.Designation || getUserInfo?.Designation,
          reqBody?.company_Id || getUserInfo?.company_Id,
          // UserIsActive,
          reqBody?.UserId || getUserInfo?.UserId,
        ]
      );
      console.log("rowUserUpdate........", rowUserUpdate);
      if (rowUserUpdate.affectedRows === 1) {
        //////////.............. checking CompanyIsActive has a boolean value or it is undefined
        if (typeof reqBody?.CompanyIsActive == "boolean") {
          CompanyIsActive = reqBody?.CompanyIsActive ? 1 : 0;
        } else if (typeof reqBody?.CompanyIsActive == undefined) {
          CompanyIsActive = getCompanyrInfo?.isActive;
        }
        console.log("getCompanyrInfo.......", getCompanyrInfo?.isActive);
        console.log("CompanyIsActive....", CompanyIsActive);
        [rowCompanyUpdate] = await dbConn.execute(
          "UPDATE `company_ragistration` SET `companyName`=?, `companyEmail`=?, `companyURL`=?, `remark`=?, `companyLocation`=?  WHERE `company_Id` = ?",
          [
            reqBody?.companyName || getCompanyrInfo?.companyName,
            reqBody?.companyEmail || getCompanyrInfo?.companyEmail,
            reqBody?.companyURL || getCompanyrInfo?.companyURL,
            reqBody?.remark || getCompanyrInfo?.remark,
            reqBody?.companyLocation || getCompanyrInfo?.companyLocation,
            // CompanyIsActive,
            reqBody?.company_Id || getCompanyrInfo?.company_Id,
          ]
        );
        console.log("rowCompanyUpdate........", rowCompanyUpdate);
        if (rowCompanyUpdate.affectedRows === 1) {
          return resp.status(201).json({
            success: true,
            data: rowCompanyUpdate,
            message: "The details has been successfully updated",
          });
        } else {
          return resp.status(403).json({
            success: false,
            message: "Unable to update Company details",
          });
        }
      } else {
        return resp.status(403).json({
          success: false,
          message: "Unable to update User details",
        });
      }
    } else {
      if (rowCompany.length === 0) {
        return resp.json({
          success: false,
          message: "company_Id and UserId must required",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
