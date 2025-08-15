const express = require('express');
const multer = require('multer');
const {
  createBook,
  getAllBooks,
  deleteBook,
  updateBook,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory

} = require('../Controllers/bookcontrollers.js');

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/books');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes
router.post(
  '/create',
  upload.fields([{ name: 'coverImage' }, { name: 'pdf' }]),
  createBook
);

router.get('/all', getAllBooks);

router.delete('/:id', deleteBook);

router.put(
  '/:id',
  upload.fields([{ name: 'coverImage' }, { name: 'pdf' }]),
  updateBook
);

router.post('/categories/create', createCategory);
router.get('/categories', getAllCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// ✅ Use module.exports instead of export default
module.exports = router;
