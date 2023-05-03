const express = require('express');
const router = express.Router();
const Jobs = require('../Controller/company');
// const auth = require("../middleware/auth");

// Retrieve all employees
router.get('/company/getAll',Jobs.findAll);

// Create a new employee
router.post('/create', Jobs.create);

// Retrieve a single employee with id
// router.get('/=:id', Jobs.findById);

// Update a employee with id
router.post('/company', Jobs.update);

// Delete a employee with id
// router.delete('/:id', Jobs.delete);

module.exports = router