
const Exam = require('../Models/ExamModel');
const mongoose = require("mongoose");
const Submission=require('../Models/exam.submission.models')
exports.createExam = async (req, res) => {
try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    
  }
};


exports.getExamDetailsForStudent = async (req, res) => {
  try {
    const { id } = req.params; // exam _id
    const exam = await Exam.findById({_id:id}); // hide sensitive fields

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get exams for teachers
exports.getExamsByTeacher = async (req, res) => {
  try {
    const {id} = req.params // ✅ use `new`
    const exams = await Exam.findOne({ createdBy: id });
    console.log(id)
    res.json({
      mes: true,
      exams: exams,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};

// get exams by id 
exports.getExamById = async (req, res) => {
  try {
    const { id } = req.params; // exam document id

    // Find exam by _id
    const exam = await Exam.findOne({ createdBy: id });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({
      success: true,
      exam: exam,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};


 // delete exams
 exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
 }

 // update 
exports.updateExamByCreator = async (req, res) => {
  try {
    const {id}=req.params
    const updatedExam = await Exam.findOneAndUpdate(
      { createdBy: id }, // Match by teacher id
      { $set: req.body },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ error: 'No exam found for this teacher' });
    }

    res.json(updatedExam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//submit exam
exports.submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers, studentId } = req.body; // In real app, get studentId from JWT

    const newSubmission = new Submission({ examId, studentId, answers });
    await newSubmission.save();

    res.json({ success: true, message: "Exam submitted successfully" });
  } catch (err) {
    console.error("Error in submitExam:", err);
    res.status(500).json({ message: err.message });
  }
};



//list of exams 
// GET /exam/student/list/:studentId
// GET /exam/student/list
exports.getAllExamsForStudents = async (req, res) => {
  try {
    const now = new Date();

    const exams = await Exam.find({
      $expr: {
        $gte: [
          { $add: ["$scheduledAt", { $multiply: ["$durationMinutes", 60000] }] },
          now
        ]
      }
    }).select("title subject durationMinutes scheduledAt totalMarks");

    res.json({ success: true, exams });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


