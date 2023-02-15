const router = require("express").Router();
const { body } = require("express-validator");
const { register } = require("../login controllers/registerController.js");
const { login } = require("../login controllers/loginController.js");
// const {getUser} = require('./controllers/getUserController');
const { getUserName } = require("../login controllers/getcontroller.js");
const {
   CompanyRegistration,
} = require("../login controllers/CompanyRegistration.js");
const { ContactDetails } = require("../login controllers/ContactDetails.js");
const {
  ContactDetailsEdit,
} = require("../login controllers/ContactDetails.js");
const { UserRoles } = require("../login controllers/UserRoleMaster.js");
// const{Campaign}=require('../login controllers/UserRoleMaster.js')
const { Campaign } = require("../login controllers/Campaign.js");
const { CampaignDetailsEdit } = require("../login controllers/Campaign.js");
const { Segment } = require("../login controllers/Segment.js");
const{UpdateSegment}=require('../login controllers/Segment');
const{getSegment}=require('../login controllers/getSegment');

const {
  getScheduler,
  addScheduler,
  getAllScheduler,
  updateScheduler,
} = require("../login controllers/Scheduler");

const { getAllUser } = require('../Controller/GetContact');
const { CompanyDetailsEdit } = require('../login controllers/CompanyRegistration');
//const{getAllUser}=require('../login controllers/')
const{getUserCompanyDataByUserId}=require('../login controllers/userDetailsWithCompanyData')
router.post(
  "/InviteUser",
  [
    body("Name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),

    body('Username', "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),

    body('Email', "Invalid email address")
      .notEmpty()
      .escape()
      .trim().isEmail(),

    body("Password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),

  ],
  register);

router.post('/login', [
  body('Email', "Invalid Email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
  body('Password', "The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], login);

router.get('/getoneuser/:Email', getUserName);


router.post('/subs', CompanyRegistration);
router.put('/subs/company', CompanyDetailsEdit);


router.post('/contact', ContactDetails);
router.put('/contact/edit', ContactDetailsEdit);


router.post('/userRole', UserRoles);

router.post('/Campaign', Campaign);
router.put('/Campaign/edit', CampaignDetailsEdit);

router.post('/Segment', Segment);
router.put('/UpdateSegment',UpdateSegment); 
router.get('/getSegment',getSegment);


router.get('/getall',getAllUser);
// router.get('/GetContact/:contact_Email', GetContact);

// router.post('/Campaign',Campaign);

// router.get('/getoneuser',getUserName);

// router.get('/getuser',getUser)
router.get("/getScheduler/Id=?", getScheduler);
router.put("/updateScheduler/Id=?", updateScheduler);
router.post("/addSchedule", addScheduler);
router.get("/getAllScheduler", getAllScheduler);
// router.get('/getScheduler/:scheduler_Id',getScheduler);
router.get("/allCompaniesByUserId/UserId:UserId", getUserCompanyDataByUserId);

module.exports = router;
