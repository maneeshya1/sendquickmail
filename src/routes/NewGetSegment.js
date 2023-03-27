const express = require('express')
const router2 = express.Router()
const NewGetSegment = require('../Controller/NewGetSegment');

router2.post('/search', NewGetSegment.findBySearch);

module.exports = router2;