// routes/courseRoutes.js
const express = require("express");
const upload = require("../Middlewares/coursemulter");
const { createCourse } = require("../Controllers/CourseController");

const router = express.Router();

const uploadFields = [
  { name: "coverphoto", maxCount: 1 },
];

// Add dynamic fields for chapters
for (let i = 0; i < 20; i++) {
  uploadFields.push({ name: `chapters[${i}][study_file]`, maxCount: 1 });
}

router.post("/create-course", upload.fields(uploadFields), createCourse);

module.exports = router;
