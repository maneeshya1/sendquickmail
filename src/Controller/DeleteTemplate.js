'use strict';

const DeleteTemplate =require('../Models/DeleteTemplate.model');

exports.delete = function(req, res) {
    DeleteTemplate.delete( req.params.template_Id, function(err, employee) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'Template successfully deleted' });
    });
  };