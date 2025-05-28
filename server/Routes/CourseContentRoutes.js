const express= require('express');
const { createCourseContent } = require('../Controllers/CourseContentCtrl');
const router= express.Router();


router.post('/createCourseContent',createCourseContent);

module.exports= router;