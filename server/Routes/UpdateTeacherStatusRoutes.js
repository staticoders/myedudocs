const express = require('express');
const UpdateTeacherStatus=require('../Controllers/TeacherStatusUpdate');

const router = express.Router();

// Route to update teacher status
router.put('/:id', UpdateTeacherStatus);

module.exports = router;