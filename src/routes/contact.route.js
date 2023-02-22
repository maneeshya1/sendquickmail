const express = require("express");
const router1 = express.Router();
const contactController = require("../Controller/Contact.controller");

router1.post("/contact/create", contactController.create);
router1.put("/contact/updateById", contactController.updateById);
router1.put("/contact/updateByEmail", contactController.updateByEmail);
router1.get("/contact/findById=:id", contactController.findById);
router1.get("/contact/findAll", contactController.findAll);

module.exports = router1;
