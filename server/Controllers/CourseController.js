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

// Create a new course (with image upload)
const createCourse = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      // Destructure the course data from the request body
      const { cname, cinstructor, cdur, clesson, cskill_level, clanguage, c_category, cprice,cvdolink, cdesc } = req.body;

      // The image path is saved in `req.file.path`
      const cimage = req.file ? `/uploads/${req.file.filename}` : ''; // Save the relative path to the image

      // Create a new course document
      const newCourse = new Course({
        cname,
        cinstructor,
        cdur,
        clesson,
        cskill_level,
        clanguage,
        c_category,
        cprice,
        cimage,  // Save image path or URL here
        cvdolink,
        cdesc,
      });

      // Save the course document
      const savedCourse = await newCourse.save();

      // Send the response with the saved course
      res.status(201).json({
        message: 'Course created successfully!',
        course: savedCourse,
      });
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({
        message: 'Error creating course',
        error: error.message,
      });
    }
  });
};




module.exports = {
  createCourse,
};
