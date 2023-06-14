const express = require('express')
const router = express.Router()
const DeleteTemplate = require('../Controller/DeleteTemplate');



router.delete('/:template_Id', DeleteTemplate.delete);


module.exports = router