const express = require('express');
const CourseController = require('../Controllers/CourseController');
const router = express.Router();

router.post('/addCourse', CourseController.createCourse); // Route to add a new course

module.exports = router;