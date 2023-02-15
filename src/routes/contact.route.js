const express = require('express')
const router1 = express.Router()
const contactController = require('../Controller/Contact.controller');


router1.post('/contact/create', contactController.create);

module.exports = router1;