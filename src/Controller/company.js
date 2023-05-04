'use strict';

const Employee = require('../Models/company');
// const VerifyToken = require('../middleware/auth');



exports.findAll = function (req, res) {
   
        Employee.findAll(function (err, employee) {
            console.log('controller')
            if (err)
                res.send(err);
            console.log('res', employee);
            res.send(employee);
        });
   
   
};




exports.create = function (req, res) {
   
        const new_employee = new Employee(req.body);

        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            Employee.create(new_employee, function (err, response) {
                if (err)
                    res.send(err);
                res.json({ error: false, message: response });
            });
        }
};


exports.findById = function (req, res) {
   
        Employee.findById(req.params.company_Id, function (err, employee) {
            if (err)
                res.send(err);
            res.json(employee);
        });
};



exports.update = function (req, res) {
   
        const new_employee = new Employee(req.body);
console.log("mmm..........",req.body);
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Please provide all required field' });
        } else {
            console.log(req.body.company_Id)
            Employee.update(req.body.company_Id, new_employee, function (err, response) {
                if (err)
                    res.send(err);
                    res.json({ error: false, message: response });
            });
        }
   
};



