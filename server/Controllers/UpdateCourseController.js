const express = require('express');
const Course = require('../Models/CourseModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');





// Set up Multer storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store the images in a folder named 'uploads' in the root directory
    const uploadPath = 'C:/Users/rickb/OneDrive/Desktop/EDUDOCS/client/public/uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = path.basename(file.originalname); // Ensures only the filename
    cb(null, safeName);
  }
});

// Multer instance for uploading images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow image files (jpg, jpeg, png, gif)
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
}).single('cimage'); // Field name that will hold the image file in the form


// update course
const updateCourse = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        cname,
        cinstructor,
        cdur,
        clesson,
        cskill_level,
        clanguage,
        c_category,
        cprice,
        cdesc,
      } = req.body;

      const courseId = req.params.id;

      const updateData = {
        cname,
        cinstructor,
        cdur,
        clesson,
        cskill_level,
        clanguage,
        c_category,
        cprice,
        cdesc,
      };

      if (req.file) {
        updateData.cimage = req.file ? `/uploads/${req.file.filename}` : '';
      }

      const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({
        message: 'Course updated successfully!',
        course: updatedCourse,
      });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({
        message: 'Error updating course',
        error: error.message,
      });
    }
  });
};



module.exports = updateCourse;