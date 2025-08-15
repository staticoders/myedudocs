const express = require('express');
const router = express.Router();
const examController = require('../Controllers/ExamController');
// const auth = require('../middlewares/auth'); // assumes JWT middleware

router.post('/create', examController.createExam);
router.get('/teacher/:id', examController.getExamsByTeacher);
router.get("/fetch/:id", examController.getExamById);
router.put('/update/:id',examController.updateExamByCreator)
router.delete('/delete/:id',examController.deleteExam);
router.get("/student/fetch/:id", examController.getExamDetailsForStudent);
// GET /exam/student/list/:studentId
router.get("/student/list", examController.getAllExamsForStudents);
router.post("/student/submit/:examId", examController.submitExam);
module.exports = router;
