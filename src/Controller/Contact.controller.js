'use strict';

const Contact = require('../Models/contact.model');

exports.findAll = function (req, res) {
    Contact.findAll(function (err, contact) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', contact);
        res.send(contact);
    });
};

exports.create = function (req, res) {
    const contacts = req.body.contacts;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    }
    else {
        Contact.create(contacts, function (err, contact) {
            if (err)
                res.send(err);
            res.json({ error: false, success: true, message: "contact added successfully!", data: contact });
        });
    }
};

exports.findById = function (req, res) {
    Contact.findById(req.params.contactID, function (err, contact) {
        if (err)
            res.send(err);
        res.json(contact);
    });
};

