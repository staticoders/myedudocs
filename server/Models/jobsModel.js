const mongoose = require('mongoose');

// === JobCategory Model ===
// Collection: jobcategories
const JobCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subcategories: [{ type: String }], // e.g., Engineering, Teaching
});


// === JobPost Model ===
// Collection: jobposts
const JobPostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "SSC CGL Recruitment 2025"
  job_type: { type: String, enum: ['Government', 'Private'], required: true },

  organization_name: { type: String, required: true },
  job_category: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCategory', required: true },
  subcategory: { type: String }, // e.g., "Clerk", "Engineering"

  location: { type: String, required: true },

  qualifications_required: [{ type: String }], // e.g., "Graduate", "10th Pass"
  experience_required: { type: String },

  salary_min: { type: Number },
  salary_max: { type: Number },
  salary_type: { type: String, enum: ['Monthly', 'Annual'], default: 'Monthly' },

  age_limit_min: { type: Number },
  age_limit_max: { type: Number },
  age_relaxation: { type: String }, // Optional notes

  total_vacancies: { type: Number },
  reservation_details: {
    general: { type: Number },
    obc: { type: Number },
    sc: { type: Number },
    st: { type: Number },
    ews: { type: Number },
    pwd: { type: Number },
  },

  selection_process: [{ type: String }], // e.g., ["Written Exam", "Interview"]
  exam_mode: { type: String }, // Online / Offline / CBT / OMR
  application_mode: { type: String }, // Online / Offline

  application_fee: {
    general: { type: Number },
    obc: { type: Number },
    sc: { type: Number },
    st: { type: Number },
    pwd: { type: Number },
    female: { type: Number },
  },

  important_dates: {
    start_date: { type: Date },
    last_date: { type: Date },
    fee_last_date: { type: Date },
    exam_date: { type: Date },
    admit_card_release: { type: Date },
    result_date: { type: Date },
  },

  application_link: { type: String },
  job_pdf_url: { type: String }, // Official Notification PDF
  official_website: { type: String },

  admit_card_url: { type: String },
  result_url: { type: String },
  syllabus_url: { type: String },

  status: { type: String, enum: ['Active', 'Expired'], default: 'Active' },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  posted_on: { type: Date, default: Date.now },
});


// === Export Models ===
module.exports = {
  JobCategory: mongoose.model('JobCategory', JobCategorySchema),
  JobPost: mongoose.model('JobPost', JobPostSchema),
};
