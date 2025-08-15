const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['mcq', 'short', 'paragraph'],
    required: true
  },
  questionText: { type: String, required: true },
  options: [String], // Only for MCQ
  correctAnswer: { type: String }, // Optional
  marks: { type: Number, default: 1 }
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true }, // ✅ Added subject
  instructions: { type: String },
  totalMarks: { type: Number },
  durationMinutes: { type: Number, required: true },
  scheduledAt: { type: Date }, // ✅ Made optional
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Exam", examSchema);
