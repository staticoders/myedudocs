const express= require('express');
const CourseController= require('../Controllers/AllCourseController');
const router= express.Router();


router.get('/allCourses',CourseController);

module.exports= router;