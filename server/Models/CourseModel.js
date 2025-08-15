const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
  chapter_name: { type: String, required: true },
  study_file: { type: String, required: true }, // file path
});

const courseSchema = new mongoose.Schema({
  title: String,
  short_desc: String,
  long_desc: String,
  price: Number,
  duration: Number,
  teacher_id: { type: String, ref: "Teacher" },
  coverphoto: String,
  youtube_link: String,
  language: String,
  skill_level: String,
  chapters: [chapterSchema],
});


const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
module.exports = Course;
