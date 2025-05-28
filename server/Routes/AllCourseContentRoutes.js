const express = require('express'); 
const allCourse = require('../Controllers/AllCourseContent');
// const updateStaus = require('../Controllers/AllCourseContent');
const router = express.Router();

router.get('/allCourseContent', allCourse);
// router.put('/:id',updateStaus)

module.exports = router;