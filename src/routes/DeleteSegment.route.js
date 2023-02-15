const express = require('express')
const router = express.Router()
const DeleteSegment = require('../Controller/DeleteSegment');



router.delete('/:segment_Id', DeleteSegment.delete);


module.exports = router