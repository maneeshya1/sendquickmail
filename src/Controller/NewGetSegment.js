const Segment = require('../Models/NewGetSegment');

exports.findBySearch = function(req, res) {
    console.log('.................',req.body);
    Segment.findBySearch(req.body, function(err, Segment) {
        if (err)
        res.send(err);
        res.json(Segment);
    });
};