const express = require('express');
const deleteStudent = require('../Controllers/DeleteStudent');

const router = express.Router();


// delete student route
router.delete('/:id', deleteStudent);

module.exports = router;