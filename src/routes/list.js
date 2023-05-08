const express = require('express');
const router = express.Router();
const Jobs = require('../Controller/list');
// const auth = require("../middleware/auth");

// Retrieve all employees
// router.get('/company/getAll',Jobs.findAll);

// Create a new employee
// router.post('/create', Jobs.create);

// Retrieve a single employee with id
// router.get('/company/:company_Id', Jobs.findById);


router.get('/listby/:UserId', Jobs.findByUserID);

// Update a employee with id
// router.post('/company', Jobs.update);

// Delete a employee with id
// router.delete('/:id', Jobs.delete);

module.exports = router