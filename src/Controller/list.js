'use strict';

const Employee = require('../Models/list');
// const VerifyToken = require('../middleware/auth');


exports.findByUserID = function (req, res) {
   
    Employee.findByUserID(req.params.UserId, function (err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};








