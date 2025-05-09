const express = require('express');
const UpdateCourseController = require('../Controllers/UpdateCourseController');
const router = express.Router();

// Route to update a course
router.put('/:id', UpdateCourseController);


module.exports = router;