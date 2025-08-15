import Book from '../Models/booksModel.js';
import Category from '../Models/booksCategories.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, description, category, price, isFeatured, isPopular } = req.body;
    const coverImage = req.files?.coverImage?.[0]?.filename;
    const pdfUrl = req.files?.pdf?.[0]?.filename;

    const book = new Book({
      title, author, description, category, price,
      isFeatured, isPopular,
      coverImage: `/uploads/books/${coverImage}`,
      pdfUrl: `/uploads/books/${pdfUrl}`
    });

    await book.save();
    res.status(201).json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Book creation failed', error: err.message });
    console.log(err);
    
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch failed' });
    console.log(err);
    
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.coverImage) {
      updateData.coverImage = `/uploads/books/${req.files.coverImage[0].filename}`;
    }
    if (req.files?.pdf) {
      updateData.pdfUrl = `/uploads/books/${req.files.pdf[0].filename}`;
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists.' });
    }

    const category = new Category({ name: name.trim() });
    await category.save();

    res.status(201).json({ message: 'Category created successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category.', error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.', error: error.message });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'New category name is required.' });
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category updated successfully.', category: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category.', error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category.', error: error.message });
  }
};