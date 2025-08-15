const express = require('express');
const mongoose = require('mongoose');
const CourseModel = require('../Models/CourseModel');

const CourseDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Course ID' });
    }

    // ✅ Find course
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ status:true, course:course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = CourseDetailsController;
