'use strict';

const DeleteSegment =require('../Models/DeleteSegment.model');

exports.delete = function(req, res) {
    DeleteSegment.delete( req.params.segment_Id, function(err, employee) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'Segment successfully deleted' });
    });
  };