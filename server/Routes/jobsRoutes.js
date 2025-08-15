const express = require('express');
const router = express.Router();
const jobController = require('../Controllers/jobControllers');

// Routes
router.post('/create', jobController.createJobPost);
router.get('/', jobController.getAllJobPosts);
router.get('/:id', jobController.getJobPostById);
router.put('/update/:id', jobController.updateJobPost);
router.delete('/delete/:id', jobController.deleteJobPost);

module.exports = router;
