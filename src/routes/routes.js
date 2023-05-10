const router = require("express").Router();
const { body } = require("express-validator");
const { register } = require("../login controllers/registerController.js");
const  {login}  = require("../login controllers/loginController.js");
const {getUser} = require('../login controllers/getUserController_notused.js');
const { getUserName } = require("../login controllers/getcontroller.js");
const {
  CompanyRegistration,
} = require("../login controllers/CompanyRegistration.js");
const { ContactDetails } = require("../login controllers/ContactDetails.js");
const {
  ContactDetailsEdit,
} = require("../login controllers/ContactDetails.js");
const {
  ContactUnSubscribe,
} = require("../login controllers/ContactDetails.js");
const { GetContactDetails } = require("../login controllers/GetContactDetails");
const { Get_TodayContactDetails } = require("../login controllers/GetContactDetails");
const { GetAllContactDetails } = require("../login controllers/GetAllContactDetails");

const { UserRoles } = require("../login controllers/UserRoleMaster.js");
// const{Campaign}=require('../login controllers/UserRoleMaster.js')
const { Campaign } = require("../login controllers/Campaign.js");
const { CampaignDetailsEdit } = require("../login controllers/Campaign.js");
const { Segment } = require("../login controllers/Segment.js");
const { UpdateSegment } = require("../login controllers/Segment");
const { GetSegmentbyId } = require("../login controllers/Segment.js");
const { getSegment } = require("../login controllers/getSegment");
const { GetTemplate } = require("../login controllers/GetTemplate");
const { Mail } = require('../login controllers/Mail');
const{Fileupload}=require('../login controllers/Fileupload.js');
const{List}=require('../login controllers/List.js')

const {
  getScheduler,
  addScheduler,
  getAllScheduler,
  updateScheduler,
} = require("../login controllers/Scheduler");

const { getAllUser } = require("../Controller/GetContact");
const {
  CompanyDetailsEdit,
} = require("../login controllers/CompanyRegistration");
//const{getAllUser}=require('../login controllers/')
const {
  getUserCompanyDataByUserId,
  updateUserByUserId,
} = require("../login controllers/userDetailsWithCompanyData");
const {
  addList_of_TimeZone,
  getTimeZone,
  addTimeZone,
  updateTimeZone,
} = require("../TimeZone/TimeZone");

const {
  ChangePassword,
} = require("../login controllers/changePassword/changePassword");

router.post(
  "/InviteUser",
  [
    body("Name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),

    body("Username", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),

    body("Email", "Invalid email address").notEmpty().escape().trim().isEmail(),

    body("Password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("Email", "Invalid Email address").notEmpty().escape().trim().isEmail(),
    body("Password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);

router.get("/getUser", getUser);

router.get("/getoneuser/:Email", getUserName);

router.post("/subs", CompanyRegistration);
router.put("/subs/company", CompanyDetailsEdit);

router.post("/contact", ContactDetails);
router.put("/contact/edit", ContactDetailsEdit);
router.post("/GetContactDetails/companyId=?", GetContactDetails);
router.get("/GetAllContactDetails", GetAllContactDetails);

router.post("/GetContactDetails/created_Date=?", Get_TodayContactDetails);
router.put("/ContactUnSubscribe/ByEmail", ContactUnSubscribe);

router.post("/userRole", UserRoles);
router.post('/Fileupload',Fileupload);
router.post('/List',List);

router.post("/Campaign", Campaign);
router.put("/Campaign/edit", CampaignDetailsEdit);

router.post("/Segment", Segment);
router.put("/UpdateSegment", UpdateSegment);
router.get("/getSegment", getSegment);
router.get("/getSegment/segmentId=?", GetSegmentbyId);


// template.................................................
router.get("/getTemplate", GetTemplate);

router.get("/getall", getAllUser);
router.post('/mail',Mail);
// router.get('/GetContact/:contact_Email', GetContact);

// router.post('/Campaign',Campaign);

// router.get('/getoneuser',getUserName);

// router.get('/getuser',getUser)
router.get("/getScheduler/Id=?", getScheduler);
router.put("/updateScheduler/Id=?", updateScheduler);
router.post("/addSchedule", addScheduler);
router.get("/getAllScheduler", getAllScheduler);
// router.get('/getScheduler/:scheduler_Id',getScheduler);


router.post("/allCompaniesByUserId/UserId:UserId", getUserCompanyDataByUserId);

//////////////
router.post("/addList_of_TimeZone", addList_of_TimeZone);
router.get("/getAll_TimeZone", getTimeZone);
router.post("/addTimeZone", addTimeZone);
router.put("/updateTimeZone", updateTimeZone);
router.put("/updateUserByUserId", updateUserByUserId);
router.put("/ChangePassword/ByUserId", ChangePassword);

module.exports = router;
