const express = require('express');
const {updateCourse} = require('../Controllers/UpdateCourseController');
const upload = require("../Middlewares/coursemulter");
const router = express.Router();


const uploadFields = [
  { name: "coverphoto", maxCount: 1 },
];

// Add dynamic fields for chapters
for (let i = 0; i < 20; i++) {
  uploadFields.push({ name: `chapters[${i}][study_file]`, maxCount: 1 });
}


// Route to update a course
router.put('/:id',upload.fields(uploadFields), updateCourse);


module.exports = router;