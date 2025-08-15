const { JobPost, JobCategory } = require('../Models/jobsModel');

// Create a new job post
exports.createJobPost = async (req, res) => {
  try {
    const jobData = req.body;

    // Optional: Validate if job category exists
    const category = await JobCategory.findById(jobData.job_category);
    if (!category) {
      return res.status(400).json({ error: 'Invalid job category ID' });
    }

    const newJob = new JobPost(jobData);
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (err) {
    console.error('Error creating job post:', err);
    res.status(500).json({ error: 'Failed to create job post' });
  }
};

// Get all job posts (with optional filtering)
exports.getAllJobPosts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.job_type) filters.job_type = req.query.job_type;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.category) filters.job_category = req.query.category;

    const jobs = await JobPost.find(filters)
      .populate('job_category', 'name') // Populate category name
      .sort({ posted_on: -1 });

    res.status(200).json({
      mes:true,
      jobs:jobs
    });
  } catch (err) {
    console.error('Error fetching job posts:', err);
    res.status(500).json({ error: 'Failed to fetch job posts' });
  }
};

// Get a single job post by ID
exports.getJobPostById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id)
      .populate('job_category', 'name');

    if (!job) {
      return res.status(404).json({ error: 'Job post not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error('Error fetching job post:', err);
    res.status(500).json({ error: 'Failed to fetch job post' });
  }
};

// Update a job post by ID
exports.updateJobPost = async (req, res) => {
  try {
    const updatedJob = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job post not found' });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error('Error updating job post:', err);
    res.status(500).json({ error: 'Failed to update job post' });
  }
};

// Delete a job post by ID
exports.deleteJobPost = async (req, res) => {
  try {
    const deletedJob = await JobPost.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job post not found' });
    }

    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (err) {
    console.error('Error deleting job post:', err);
    res.status(500).json({ error: 'Failed to delete job post' });
  }
};
