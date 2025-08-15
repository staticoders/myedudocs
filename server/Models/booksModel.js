import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'BookCategory' },
  coverImage: String,
  pdfUrl: String,
  price: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Book', bookSchema);
