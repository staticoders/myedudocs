const express = require('express');

const DeleteCourse= require('../Controllers/DeleteCourse');

const router = express.Router();

// Route to delete a course

router.delete('/:id', DeleteCourse);

module.exports = router;