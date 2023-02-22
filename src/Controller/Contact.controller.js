"use strict";

const Contact = require("../Models/contact.model");

exports.findAll = function (req, res) {
  Contact.findAll(function (err, contact) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", contact);
    res.send(contact);
  });
};

exports.create = function (req, res) {
  const contacts = req.body.contacts;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Contact.create(contacts, function (err, contact) {
      if (err) res.send(err);
      if (contact?.success) {
        res.json({ error: false, message: "successfully!", data: contact });
      } else {
        res.json({
          error: false,
          message: "contact added successfully!",
          data: contact,
        });
      }
    });
  }
};

exports.findById = function (req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) res.send(err);
    res.json(contact);
  });
};

exports.updateById = function (req, res) {
//   console.log("params........", req.params.contactID);
  console.log("body........", req?.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please provide updation required fields",
    });
  } else {
    // Contact.updateById(req.params.contactID, new Contact(req.body), function(err, contact) {
    Contact.updateById(
    //   req.params.contactID,
      req?.body || {},
      function (err, contact) {
        if (err) res.send(err);
        res.json({
          contact: contact,
          error: false,
          message: "Contact successfully updated",
        });
      }
    );
  }
};
exports.updateByEmail = function (req, res) {
  console.log("body........", req?.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please provide updation required fields",
    });
  } else {
    Contact.updateById(
      req?.body || {},
      function (err, contact) {
        if (err) res.send(err);
        res.json({
          contact: contact,
          error: false,
          message: "Contact successfully updated",
        });
      }
    );
  }
};
